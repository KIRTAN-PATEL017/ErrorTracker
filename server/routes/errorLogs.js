import express from 'express';
import {
  createErrorLog,
  getErrorLogs,
  getErrorLogById,
  updateErrorLog,
  deleteErrorLog,
  getAnalytics
} from '../controllers/errorLogController.js';
import { authenticate } from '../middleware/auth.js';
import { validateErrorLog } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(authenticate);

// Error log routes
router.post('/', validateErrorLog, createErrorLog);
router.get('/', getErrorLogs);
router.get('/analytics', getAnalytics);
router.get('/:id', getErrorLogById);
router.put('/:id', validateErrorLog, updateErrorLog);
router.delete('/:id', deleteErrorLog);

export default router;