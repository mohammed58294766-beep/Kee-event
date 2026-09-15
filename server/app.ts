import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import { db, UPLOADS_DIR } from './db.ts';

export const app = express();

// Cookie parser for secure admin session tokens
app.use(cookieParser());

// Safe Body parsers
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.body !== undefined && req.body !== null && typeof req.body === 'object') {
    return next();
  }
  express.json({ limit: '50mb' })(req, res, (err) => {
    if (err) {
      console.error('JSON parse error:', err);
      return res.status(400).json({ success: false, error: 'Invalid JSON payload' });
    }
    next();
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.body !== undefined && req.body !== null && typeof req.body === 'object') {
    return next();
  }
  express.urlencoded({ extended: true, limit: '50mb' })(req, res, next);
});

// Static uploads folder
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer storage for uploaded media
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const sanitizedBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `${sanitizedBase}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max for high-res images and web videos
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype.toLowerCase();
    const allowedImageMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const allowedVideoMimes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg', 'video/x-m4v'];
    const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm', '.mov', '.ogg', '.m4v'];

    if (
      allowedImageMimes.includes(mime) ||
      allowedVideoMimes.includes(mime) ||
      allowedExts.includes(ext) ||
      mime.startsWith('image/') ||
      mime.startsWith('video/')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Supported formats: JPG, PNG, WEBP, GIF images and MP4, WebM, MOV, OGG videos.'));
    }
  },
});

// Authentication extraction helper
function getAuthToken(req: Request): string | undefined {
  if (req.cookies && req.cookies.kees_admin_token) {
    return req.cookies.kees_admin_token;
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  return undefined;
}

// Auth guard middleware
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const token = getAuthToken(req);
  if (!token) {
    // If no session token, check if authenticated session exists
    return res.status(401).json({ success: false, error: 'Unauthorized. Please log in.' });
  }
  const sessionCheck = db.validateSession(token);
  if (!sessionCheck.valid) {
    return res.status(401).json({ success: false, error: 'Session expired or invalid. Please log in again.' });
  }
  (req as any).adminUser = sessionCheck.username;
  next();
}

// Create API router
const apiRouter = express.Router();

// ==========================================
// 1. PUBLIC API ROUTES
// ==========================================

// Health Check
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Kee Event & Garden API' });
});

// Public Content Endpoint
apiRouter.get('/content', (req: Request, res: Response) => {
  try {
    const content = db.getContent();
    res.json(content);
  } catch (err) {
    console.error('Error fetching content:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve website content' });
  }
});

// Public Booking Enquiry Submission
apiRouter.post('/enquiries', (req: Request, res: Response) => {
  try {
    const { fullName, phone, eventType, preferredDate, estimatedGuests, message } = req.body || {};
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required' });
    }
    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return res.status(400).json({ success: false, error: 'Phone number is required' });
    }
    if (!eventType || typeof eventType !== 'string' || !eventType.trim()) {
      return res.status(400).json({ success: false, error: 'Event type is required' });
    }
    if (!preferredDate || typeof preferredDate !== 'string' || !preferredDate.trim()) {
      return res.status(400).json({ success: false, error: 'Preferred date is required' });
    }

    const newEnquiry = db.createEnquiry({
      fullName: fullName.trim(),
      phone: phone.trim(),
      eventType: eventType.trim(),
      preferredDate: preferredDate.trim(),
      estimatedGuests: estimatedGuests ? String(estimatedGuests).trim() : undefined,
      message: message ? String(message).trim() : undefined,
    });

    res.status(201).json({ success: true, enquiryId: newEnquiry.id });
  } catch (err) {
    console.error('Error creating enquiry:', err);
    res.status(500).json({ success: false, error: 'Failed to record reservation enquiry' });
  }
});

// ==========================================
// 2. ADMIN AUTHENTICATION
// ==========================================

// Login endpoint
apiRouter.post('/admin/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required' });
    }

    const isValid = await db.verifyAdminCredentials(username, password);
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    const session = db.createSession(username);

    // Set HTTP-only cookie
    res.cookie('kees_admin_token', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return res.json({
      success: true,
      token: session.token,
      user: {
        username: session.username,
        role: 'Master Administrator',
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, error: 'Authentication failed due to a server error' });
  }
});

// Logout endpoint
apiRouter.post('/admin/logout', (req: Request, res: Response) => {
  const token = getAuthToken(req);
  if (token) {
    db.destroySession(token);
  }
  res.clearCookie('kees_admin_token');
  res.json({ success: true, message: 'Logged out successfully' });
});

// Session check endpoint
apiRouter.get('/admin/me', (req: Request, res: Response) => {
  const token = getAuthToken(req);
  if (!token) {
    return res.json({ authenticated: false });
  }
  const sessionCheck = db.validateSession(token);
  if (!sessionCheck.valid) {
    return res.json({ authenticated: false });
  }
  res.json({
    authenticated: true,
    user: {
      username: sessionCheck.username,
      role: 'Master Administrator',
    },
  });
});

// ==========================================
// 3. ADMIN CONTENT MANAGEMENT
// ==========================================

// Get All Content for Admin Editor
apiRouter.get('/admin/content', (req: Request, res: Response) => {
  try {
    res.json(db.getContent());
  } catch (err) {
    console.error('Error fetching admin content:', err);
    res.status(500).json({ success: false, error: 'Failed to load content' });
  }
});

// Update specific content section
apiRouter.put('/admin/content/:section', (req: Request, res: Response) => {
  try {
    const { section } = req.params;
    const allowedSections = [
      'siteSettings',
      'socialLinks',
      'navigation',
      'footer',
      'seo',
      'homepage',
      'about',
      'venue',
      'services',
      'gallery',
    ];

    if (!allowedSections.includes(section)) {
      return res.status(400).json({ success: false, error: `Invalid content section: ${section}` });
    }

    if (!req.body || (typeof req.body !== 'object' && !Array.isArray(req.body))) {
      return res.status(400).json({ success: false, error: 'Unable to save changes: payload is invalid' });
    }

    const updated = db.updateSectionContent(section as any, req.body);
    return res.json({ success: true, section, data: updated });
  } catch (err: any) {
    console.error('Error updating content section:', err);
    return res.status(500).json({ success: false, error: 'Unable to save changes' });
  }
});

// ==========================================
// 4. ADMIN ENQUIRIES MANAGEMENT
// ==========================================

// List Enquiries
apiRouter.get('/admin/enquiries', (req: Request, res: Response) => {
  try {
    const enquiries = db.getEnquiries();
    res.json(enquiries);
  } catch (err) {
    console.error('Error fetching enquiries:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve enquiries' });
  }
});

// Update Enquiry Status & Notes
apiRouter.patch('/admin/enquiries/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body || {};
    const validStatuses = ['New', 'In Progress', 'Contacted', 'Closed'];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const updated = db.updateEnquiryStatus(id, status, adminNotes);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }
    res.json({ success: true, enquiry: updated });
  } catch (err) {
    console.error('Error updating enquiry:', err);
    res.status(500).json({ success: false, error: 'Failed to update enquiry record' });
  }
});

// Delete Enquiry
apiRouter.delete('/admin/enquiries/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteEnquiry(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Enquiry record not found' });
    }
    res.json({ success: true, message: 'Enquiry removed successfully' });
  } catch (err) {
    console.error('Error deleting enquiry:', err);
    res.status(500).json({ success: false, error: 'Failed to delete enquiry' });
  }
});

// ==========================================
// 5. ADMIN MEDIA LIBRARY & UPLOADS
// ==========================================

// Get Media Library items
apiRouter.get('/admin/media', (req: Request, res: Response) => {
  try {
    res.json(db.getMedia());
  } catch (err) {
    console.error('Error fetching media:', err);
    res.status(500).json({ success: false, error: 'Failed to load media library' });
  }
});

// Upload Media Endpoint (Image or Video)
apiRouter.post(
  '/admin/upload',
  (req: Request, res: Response) => {
    upload.single('file')(req, res, (err: any) => {
      if (err) {
        console.error('Multer upload error:', err);
        return res.status(400).json({ success: false, error: err.message || 'File upload failed' });
      }

      try {
        if (!req.file) {
          return res.status(400).json({ success: false, error: 'No media file provided for upload' });
        }

        const diskPath = path.join(UPLOADS_DIR, req.file.filename);
        if (!fs.existsSync(diskPath)) {
          return res.status(500).json({ success: false, error: 'Failed to persist media file to storage disk' });
        }

        const fileRecord = db.addMedia({
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimeType: req.file.mimetype,
          size: req.file.size,
          url: `/uploads/${req.file.filename}`,
        });

        return res.status(201).json({
          success: true,
          file: fileRecord,
        });
      } catch (innerErr: any) {
        console.error('Upload record persistence error:', innerErr);
        return res.status(500).json({ success: false, error: innerErr.message || 'Media upload persistence failed' });
      }
    });
  }
);

// Delete Media item
apiRouter.delete('/admin/media/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteMedia(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Media file not found' });
    }
    res.json({ success: true, message: 'Media permanently deleted from storage' });
  } catch (err) {
    console.error('Error deleting media:', err);
    res.status(500).json({ success: false, error: 'Failed to delete media' });
  }
});

// Admin Overview Metrics
apiRouter.get('/admin/overview', (req: Request, res: Response) => {
  try {
    const enquiries = db.getEnquiries();
    const content = db.getContent();
    const media = db.getMedia();

    const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
    const inProgressCount = enquiries.filter((e) => e.status === 'In Progress').length;
    const totalEnquiries = enquiries.length;
    const galleryCount = content.gallery?.length || 0;
    const servicesCount = (content.services || []).filter((s: any) => s.enabled !== false).length;

    res.json({
      status: 'Live & Operational',
      totalEnquiries,
      newEnquiriesCount,
      inProgressCount,
      galleryCount,
      servicesCount,
      totalMediaCount: media.length,
      recentEnquiries: enquiries.slice(0, 5),
    });
  } catch (err) {
    console.error('Error fetching overview metrics:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve overview statistics' });
  }
});

// Mount router on both /api and / to handle different proxy/rewrite configurations
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Global Express error handler prevents process crash and unhandled rejections
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled server error:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    success: false,
    error: err?.message || 'Unable to save changes',
  });
});

export default app;
