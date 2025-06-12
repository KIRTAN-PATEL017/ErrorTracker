export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface ErrorLog {
  id: string;
  title: string;
  description: string;
  programmingLanguage: string;
  category: string;
  solution: string;
  createdAt: string;
  userId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export type ProgrammingLanguage = 
  | 'JavaScript'
  | 'TypeScript'
  | 'Python'
  | 'Java'
  | 'C++'
  | 'React'
  | 'Node.js'
  | 'PHP'
  | 'Go'
  | 'Rust';

export type ErrorCategory = 
  | 'Syntax Error'
  | 'Logic Error'
  | 'Runtime Error'
  | 'Type Error'
  | 'API Error'
  | 'Database Error'
  | 'Performance Issue'
  | 'Security Issue'
  | 'Build Error'
  | 'Deployment Error';