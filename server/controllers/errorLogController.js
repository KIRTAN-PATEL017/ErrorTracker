import ErrorLog from '../models/ErrorLog.js';
import mongoose from 'mongoose';

export const createErrorLog = async (req, res) => {
  try {
    const errorLog = new ErrorLog({
      ...req.body,
      userId: req.user._id
    });

    await errorLog.save();
    await errorLog.populate('userId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Error log created successfully',
      data: { errorLog }
    });
  } catch (error) {
    console.error('Create error log error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating error log'
    });
  }
};

export const getErrorLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      programmingLanguage,
      category,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { userId: req.user._id };
    
    if (programmingLanguage) {
      filter.programmingLanguage = programmingLanguage;
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { solution: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [errorLogs, total] = await Promise.all([
      ErrorLog.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('userId', 'name email'),
      ErrorLog.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: {
        errorLogs,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get error logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching error logs'
    });
  }
};

export const getErrorLogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid error log ID'
      });
    }

    const errorLog = await ErrorLog.findOne({
      _id: id,
      userId: req.user._id
    }).populate('userId', 'name email');

    if (!errorLog) {
      return res.status(404).json({
        success: false,
        message: 'Error log not found'
      });
    }

    res.json({
      success: true,
      data: { errorLog }
    });
  } catch (error) {
    console.error('Get error log by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching error log'
    });
  }
};

export const updateErrorLog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid error log ID'
      });
    }

    const errorLog = await ErrorLog.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    if (!errorLog) {
      return res.status(404).json({
        success: false,
        message: 'Error log not found'
      });
    }

    res.json({
      success: true,
      message: 'Error log updated successfully',
      data: { errorLog }
    });
  } catch (error) {
    console.error('Update error log error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating error log'
    });
  }
};

export const deleteErrorLog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid error log ID'
      });
    }

    const errorLog = await ErrorLog.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!errorLog) {
      return res.status(404).json({
        success: false,
        message: 'Error log not found'
      });
    }

    res.json({
      success: true,
      message: 'Error log deleted successfully'
    });
  } catch (error) {
    console.error('Delete error log error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting error log'
    });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get total count
    const totalErrors = await ErrorLog.countDocuments({ userId });

    // Get language statistics
    const languageStats = await ErrorLog.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$programmingLanguage', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get category statistics
    const categoryStats = await ErrorLog.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get monthly statistics
    const monthlyStats = await ErrorLog.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    // Get recent errors
    const recentErrors = await ErrorLog.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title description programmingLanguage category createdAt');

    // Get severity distribution
    const severityStats = await ErrorLog.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$severity', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalErrors,
        languageStats: languageStats.map(stat => ({
          language: stat._id,
          count: stat.count
        })),
        categoryStats: categoryStats.map(stat => ({
          category: stat._id,
          count: stat.count
        })),
        monthlyStats: monthlyStats.map(stat => ({
          year: stat._id.year,
          month: stat._id.month,
          count: stat.count
        })),
        severityStats: severityStats.map(stat => ({
          severity: stat._id,
          count: stat.count
        })),
        recentErrors
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching analytics'
    });
  }
};