const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: any[];
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data: ApiResponse<T> = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data.data;
  }

  // Authentication endpoints
  async register(name: string, email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ name, email, password })
    });
    
    const result = await this.handleResponse<{ user: any; token: string }>(response);
    
    // Store token
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    
    return result;
  }

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email, password })
    });
    
    const result = await this.handleResponse<{ user: any; token: string }>(response);
    
    // Store token
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    
    return result;
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<{ user: any }>(response);
  }

  async updateProfile(name: string) {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ name })
    });
    
    return this.handleResponse<{ user: any }>(response);
  }

  // Error logs endpoints
  async createErrorLog(errorLog: {
    title: string;
    description: string;
    programmingLanguage: string;
    category: string;
    solution: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/error-logs`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(errorLog)
    });
    
    return this.handleResponse<{ errorLog: any }>(response);
  }

  async getErrorLogs(params: {
    page?: number;
    limit?: number;
    programmingLanguage?: string;
    category?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  } = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    const response = await fetch(`${API_BASE_URL}/error-logs?${queryParams}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<{
      errorLogs: any[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      };
    }>(response);
  }

  async getErrorLogById(id: string) {
    const response = await fetch(`${API_BASE_URL}/error-logs/${id}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<{ errorLog: any }>(response);
  }

  async updateErrorLog(id: string, errorLog: {
    title: string;
    description: string;
    programmingLanguage: string;
    category: string;
    solution: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/error-logs/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(errorLog)
    });
    
    return this.handleResponse<{ errorLog: any }>(response);
  }

  async deleteErrorLog(id: string) {
    const response = await fetch(`${API_BASE_URL}/error-logs/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<{}>(response);
  }

  async getAnalytics() {
    const response = await fetch(`${API_BASE_URL}/error-logs/analytics`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<{
      totalErrors: number;
      languageStats: Array<{ language: string; count: number }>;
      categoryStats: Array<{ category: string; count: number }>;
      monthlyStats: Array<{ year: number; month: number; count: number }>;
      severityStats: Array<{ severity: string; count: number }>;
      recentErrors: any[];
    }>(response);
  }

  async checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return this.handleResponse<{ message: string; timestamp: string }>(response);
  }
}

export const apiService = new ApiService();