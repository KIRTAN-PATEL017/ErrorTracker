import mongoose from 'mongoose';

const errorLogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Error title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Error description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  programmingLanguage: {
    type: String,
    required: [true, 'Programming language is required'],
    enum: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C++',
      'React',
      'Node.js',
      'PHP',
      'Go',
      'Rust',
      'C#',
      'Swift',
      'Kotlin',
      'Ruby'
    ]
  },
  category: {
    type: String,
    required: [true, 'Error category is required'],
    enum: [
      'Syntax Error',
      'Logic Error',
      'Runtime Error',
      'Type Error',
      'API Error',
      'Database Error',
      'Performance Issue',
      'Security Issue',
      'Build Error',
      'Deployment Error',
      'Configuration Error',
      'Network Error'
    ]
  },
  solution: {
    type: String,
    required: [true, 'Solution is required'],
    trim: true,
    maxlength: [2000, 'Solution cannot exceed 2000 characters']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  isResolved: {
    type: Boolean,
    default: true
  },
  timeToResolve: {
    type: Number, // in minutes
    min: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
errorLogSchema.index({ userId: 1, createdAt: -1 });
errorLogSchema.index({ programmingLanguage: 1 });
errorLogSchema.index({ category: 1 });
errorLogSchema.index({ userId: 1, programmingLanguage: 1 });
errorLogSchema.index({ userId: 1, category: 1 });

export default mongoose.model('ErrorLog', errorLogSchema);