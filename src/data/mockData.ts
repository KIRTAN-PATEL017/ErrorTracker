import { ErrorLog, User } from '../types';

export const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  createdAt: '2024-01-15T10:30:00Z'
};

export const mockErrorLogs: ErrorLog[] = [
  {
    id: '1',
    title: 'Cannot read property of undefined',
    description: 'Tried to access a property on an undefined object while handling API response',
    programmingLanguage: 'JavaScript',
    category: 'Runtime Error',
    solution: 'Added optional chaining operator (?.) and proper null checks before accessing properties',
    createdAt: '2024-01-20T14:30:00Z',
    userId: '1'
  },
  {
    id: '2',
    title: 'Type string is not assignable to type number',
    description: 'Passed a string value to a function parameter that expected a number',
    programmingLanguage: 'TypeScript',
    category: 'Type Error',
    solution: 'Used parseInt() to convert string to number and added proper type validation',
    createdAt: '2024-01-19T09:15:00Z',
    userId: '1'
  },
  {
    id: '3',
    title: 'IndentationError: expected an indented block',
    description: 'Missing indentation in Python function definition',
    programmingLanguage: 'Python',
    category: 'Syntax Error',
    solution: 'Added proper 4-space indentation after function definition and conditional statements',
    createdAt: '2024-01-18T16:45:00Z',
    userId: '1'
  },
  {
    id: '4',
    title: 'CORS policy blocking API request',
    description: 'Browser blocked API request due to CORS policy when calling external API',
    programmingLanguage: 'JavaScript',
    category: 'API Error',
    solution: 'Configured CORS headers on the server and used proxy in development',
    createdAt: '2024-01-17T11:20:00Z',
    userId: '1'
  },
  {
    id: '5',
    title: 'Hook called outside of component',
    description: 'Attempted to use useState hook inside a regular function instead of React component',
    programmingLanguage: 'React',
    category: 'Logic Error',
    solution: 'Moved state logic into the component and passed values through props',
    createdAt: '2024-01-16T13:10:00Z',
    userId: '1'
  },
  {
    id: '6',
    title: 'Memory leak in event listeners',
    description: 'Event listeners not being cleaned up causing memory leaks in the application',
    programmingLanguage: 'JavaScript',
    category: 'Performance Issue',
    solution: 'Added cleanup function in useEffect to remove event listeners on unmount',
    createdAt: '2024-01-15T08:30:00Z',
    userId: '1'
  },
  {
    id: '7',
    title: 'SQL injection vulnerability',
    description: 'User input directly concatenated into SQL query without sanitization',
    programmingLanguage: 'Node.js',
    category: 'Security Issue',
    solution: 'Used parameterized queries and input validation to prevent SQL injection',
    createdAt: '2024-01-14T15:45:00Z',
    userId: '1'
  },
  {
    id: '8',
    title: 'Infinite loop in useEffect',
    description: 'useEffect running infinitely due to missing dependency array',
    programmingLanguage: 'React',
    category: 'Logic Error',
    solution: 'Added proper dependency array to useEffect and memoized callback functions',
    createdAt: '2024-01-13T10:15:00Z',
    userId: '1'
  }
];

export const programmingLanguages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'React',
  'Node.js',
  'PHP',
  'Go',
  'Rust'
];

export const errorCategories = [
  'Syntax Error',
  'Logic Error',
  'Runtime Error',
  'Type Error',
  'API Error',
  'Database Error',
  'Performance Issue',
  'Security Issue',
  'Build Error',
  'Deployment Error'
];