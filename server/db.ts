import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_NAVIGATION,
  DEFAULT_FOOTER,
  DEFAULT_SEO,
  DEFAULT_HOMEPAGE,
  DEFAULT_ABOUT,
  DEFAULT_VENUE,
  DEFAULT_SERVICES,
  DEFAULT_GALLERY,
} from './defaultData.ts';

export interface AdminSession {
  token: string;
  username: string;
  createdAt: number;
  expiresAt: number;
}

export interface EnquiryRecord {
  id: string;
  fullName: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  estimatedGuests?: string;
  message?: string;
  createdAt: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Closed';
  adminNotes?: string;
}

export interface MediaRecord {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
  usageCount?: number;
}

export interface DatabaseSchema {
  admin: {
    username: string;
    passwordHash: string;
  };
  sessions: AdminSession[];
  enquiries: EnquiryRecord[];
  media: MediaRecord[];
  content: {
    siteSettings: typeof DEFAULT_SITE_SETTINGS;
    socialLinks: typeof DEFAULT_SOCIAL_LINKS;
    navigation: typeof DEFAULT_NAVIGATION;
    footer: typeof DEFAULT_FOOTER;
    seo: typeof DEFAULT_SEO;
    homepage: typeof DEFAULT_HOMEPAGE;
    about: typeof DEFAULT_ABOUT;
    venue: typeof DEFAULT_VENUE;
    services: typeof DEFAULT_SERVICES;
    gallery: typeof DEFAULT_GALLERY;
  };
}

function getSafeWritableDir(dirname: string): string {
  const target = path.join(process.cwd(), dirname);
  try {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }
    const testFile = path.join(target, `.write_test_${Date.now()}`);
    fs.writeFileSync(testFile, 'ok');
    fs.unlinkSync(testFile);
    return target;
  } catch {
    const tmpTarget = path.join('/tmp', dirname);
    try {
      if (!fs.existsSync(tmpTarget)) {
        fs.mkdirSync(tmpTarget, { recursive: true });
      }
    } catch {}
    return tmpTarget;
  }
}

const DATA_DIR = getSafeWritableDir('data');
const DB_FILE = path.join(DATA_DIR, 'database.json');
export const UPLOADS_DIR = getSafeWritableDir('uploads');

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadOrInitialize();
  }

  private loadOrInitialize(): DatabaseSchema {
    const sourceFile = fs.existsSync(DB_FILE)
      ? DB_FILE
      : fs.existsSync(path.join(process.cwd(), 'data', 'database.json'))
      ? path.join(process.cwd(), 'data', 'database.json')
      : null;

    if (sourceFile) {
      try {
        const raw = fs.readFileSync(sourceFile, 'utf-8');
        const parsed = JSON.parse(raw);
        const data: DatabaseSchema = {
          admin: parsed.admin || this.createDefaultAdmin(),
          sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
          enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [],
          media: Array.isArray(parsed.media) ? parsed.media : [],
          content: {
            siteSettings: { ...DEFAULT_SITE_SETTINGS, ...(parsed.content?.siteSettings || {}) },
            socialLinks: { ...DEFAULT_SOCIAL_LINKS, ...(parsed.content?.socialLinks || {}) },
            navigation: parsed.content?.navigation || DEFAULT_NAVIGATION,
            footer: { ...DEFAULT_FOOTER, ...(parsed.content?.footer || {}) },
            seo: { ...DEFAULT_SEO, ...(parsed.content?.seo || {}) },
            homepage: { ...DEFAULT_HOMEPAGE, ...(parsed.content?.homepage || {}) },
            about: { ...DEFAULT_ABOUT, ...(parsed.content?.about || {}) },
            venue: { ...DEFAULT_VENUE, ...(parsed.content?.venue || {}) },
            services: parsed.content?.services || DEFAULT_SERVICES,
            gallery: parsed.content?.gallery || DEFAULT_GALLERY,
          },
        };

        if (DB_FILE !== sourceFile && !fs.existsSync(DB_FILE)) {
          this.saveDirect(data);
        }
        return data;
      } catch (err) {
        console.error('Failed to parse database.json, re-initializing defaults:', err);
      }
    }

    const initialData: DatabaseSchema = {
      admin: this.createDefaultAdmin(),
      sessions: [],
      enquiries: [],
      media: [],
      content: {
        siteSettings: DEFAULT_SITE_SETTINGS,
        socialLinks: DEFAULT_SOCIAL_LINKS,
        navigation: DEFAULT_NAVIGATION,
        footer: DEFAULT_FOOTER,
        seo: DEFAULT_SEO,
        homepage: DEFAULT_HOMEPAGE,
        about: DEFAULT_ABOUT,
        venue: DEFAULT_VENUE,
        services: DEFAULT_SERVICES,
        gallery: DEFAULT_GALLERY,
      },
    };
    this.saveDirect(initialData);
    return initialData;
  }

  private createDefaultAdmin() {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const rawPass = process.env.ADMIN_PASSWORD || 'KeesAdmin2025!';
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(rawPass, salt);
    return {
      username,
      passwordHash,
    };
  }

  private save(): boolean {
    return this.saveDirect(this.data);
  }

  private saveDirect(data: DatabaseSchema): boolean {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const jsonStr = JSON.stringify(data, null, 2);
      try {
        const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
        fs.writeFileSync(tempFile, jsonStr, 'utf-8');
        fs.renameSync(tempFile, DB_FILE);
      } catch {
        fs.writeFileSync(DB_FILE, jsonStr, 'utf-8');
      }
      return true;
    } catch (e) {
      console.error('Failed to write database file:', e);
      return false;
    }
  }

  // --- ADMIN AUTH & SESSIONS ---
  public async verifyAdminCredentials(username: string, password: string): Promise<boolean> {
    if (username !== this.data.admin.username) {
      return false;
    }
    return bcrypt.compare(password, this.data.admin.passwordHash);
  }

  public createSession(username: string): AdminSession {
    const now = Date.now();
    this.data.sessions = this.data.sessions.filter((s) => s.expiresAt > now);
    const token = crypto.randomBytes(32).toString('hex');
    const session: AdminSession = {
      token,
      username,
      createdAt: now,
      expiresAt: now + 24 * 60 * 60 * 1000, // 24 hours
    };
    this.data.sessions.push(session);
    this.save();
    return session;
  }

  public validateSession(token?: string): { valid: boolean; username?: string } {
    if (!token) return { valid: false };
    const now = Date.now();
    const session = this.data.sessions.find((s) => s.token === token && s.expiresAt > now);
    if (!session) {
      return { valid: false };
    }
    return { valid: true, username: session.username };
  }

  public destroySession(token?: string): void {
    if (!token) return;
    this.data.sessions = this.data.sessions.filter((s) => s.token !== token);
    this.save();
  }

  public async updateAdminPassword(currentPass: string, newPass: string): Promise<{ success: boolean; error?: string }> {
    const isCurrentValid = await bcrypt.compare(currentPass, this.data.admin.passwordHash);
    if (!isCurrentValid) {
      return { success: false, error: 'Current password is incorrect' };
    }
    if (newPass.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters' };
    }
    const salt = bcrypt.genSaltSync(10);
    this.data.admin.passwordHash = bcrypt.hashSync(newPass, salt);
    this.save();
    return { success: true };
  }

  public getAdminInfo() {
    return {
      username: this.data.admin.username,
      role: 'Master Administrator',
    };
  }

  // --- CONTENT ---
  public getContent() {
    return this.data.content;
  }

  public updateSectionContent<K extends keyof DatabaseSchema['content']>(
    section: K,
    payload: DatabaseSchema['content'][K]
  ): DatabaseSchema['content'][K] {
    if (payload === undefined || payload === null) {
      throw new Error(`Invalid payload for content section: ${String(section)}`);
    }
    this.data.content[section] = payload;
    const saved = this.save();
    if (!saved) {
      console.warn(`Warning: Section ${String(section)} updated in-memory, disk save returned false`);
    }
    return this.data.content[section];
  }

  // --- ENQUIRIES ---
  public getEnquiries(): EnquiryRecord[] {
    return [...this.data.enquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public createEnquiry(submission: Omit<EnquiryRecord, 'id' | 'createdAt' | 'status'>): EnquiryRecord {
    const newRecord: EnquiryRecord = {
      ...submission,
      id: 'enq-' + crypto.randomUUID().slice(0, 8),
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    this.data.enquiries.unshift(newRecord);
    this.save();
    return newRecord;
  }

  public updateEnquiryStatus(
    id: string,
    status: EnquiryRecord['status'],
    adminNotes?: string
  ): EnquiryRecord | null {
    const index = this.data.enquiries.findIndex((e) => e.id === id);
    if (index === -1) return null;
    this.data.enquiries[index].status = status;
    if (adminNotes !== undefined) {
      this.data.enquiries[index].adminNotes = adminNotes;
    }
    this.save();
    return this.data.enquiries[index];
  }

  public deleteEnquiry(id: string): boolean {
    const initialLen = this.data.enquiries.length;
    this.data.enquiries = this.data.enquiries.filter((e) => e.id !== id);
    if (this.data.enquiries.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // --- MEDIA LIBRARY ---
  public getMedia(): MediaRecord[] {
    return [...this.data.media].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public addMedia(file: Omit<MediaRecord, 'id' | 'createdAt'>): MediaRecord {
    const record: MediaRecord = {
      ...file,
      id: 'med-' + crypto.randomUUID().slice(0, 8),
      createdAt: new Date().toISOString(),
      usageCount: 0,
    };
    this.data.media.unshift(record);
    this.save();
    return record;
  }

  public deleteMedia(id: string): boolean {
    const record = this.data.media.find((m) => m.id === id);
    if (!record) return false;
    if (record.filename) {
      const diskPath = path.join(UPLOADS_DIR, record.filename);
      if (fs.existsSync(diskPath)) {
        try {
          fs.unlinkSync(diskPath);
        } catch (e) {
          console.error('Failed to unlink disk file:', e);
        }
      }
    }
    this.data.media = this.data.media.filter((m) => m.id !== id);
    this.save();
    return true;
  }
}

export const db = new Database();
