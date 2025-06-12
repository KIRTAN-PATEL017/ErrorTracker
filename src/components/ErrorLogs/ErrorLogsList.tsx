import React, { useState, useMemo } from 'react';
import { Search, Filter, Code, Calendar, Tag, Lightbulb, Trash2, Edit, Eye } from 'lucide-react';
import { mockErrorLogs } from '../../data/mockData';
import { ErrorLog } from '../../types';

export const ErrorLogsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedError, setSelectedError] = useState<ErrorLog | null>(null);

  const filteredErrors = useMemo(() => {
    return mockErrorLogs.filter(error => {
      const matchesSearch = error.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          error.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = !selectedLanguage || error.programmingLanguage === selectedLanguage;
      const matchesCategory = !selectedCategory || error.category === selectedCategory;
      
      return matchesSearch && matchesLanguage && matchesCategory;
    });
  }, [searchTerm, selectedLanguage, selectedCategory]);

  const languages = [...new Set(mockErrorLogs.map(error => error.programmingLanguage))];
  const categories = [...new Set(mockErrorLogs.map(error => error.category))];

  const ErrorCard: React.FC<{ error: ErrorLog }> = ({ error }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 dark:border-gray-700 overflow-hidden h-full flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        {/* Header with title and actions */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1 mr-4 min-h-[3.5rem]">
            {error.title}
          </h3>
          <div className="flex space-x-2 flex-shrink-0">
            <button
              onClick={() => setSelectedError(error)}
              className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
              title="View details"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              className="p-2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
              title="Edit"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Description with fixed height */}
        <div className="mb-4 flex-1">
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 h-[4.5rem] overflow-hidden">
            {error.description}
          </p>
        </div>

        {/* Tags section with consistent spacing */}
        <div className="mb-4">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
              <Code className="h-3 w-3 mr-1" />
              {error.programmingLanguage}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-teal-100 to-green-100 dark:from-teal-900/30 dark:to-green-900/30 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
              <Tag className="h-3 w-3 mr-1" />
              {error.category}
            </span>
          </div>
        </div>

        {/* Footer with consistent positioning */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(error.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
            <Lightbulb className="h-3 w-3" />
            <span>Solution available</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ErrorDetailModal: React.FC = () => {
    if (!selectedError) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white pr-4">{selectedError.title}</h2>
              <button
                onClick={() => setSelectedError(null)}
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <span className="sr-only">Close</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                <Code className="h-4 w-4 mr-2" />
                {selectedError.programmingLanguage}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-teal-100 to-green-100 dark:from-teal-900/30 dark:to-green-900/30 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
                <Tag className="h-4 w-4 mr-2" />
                {selectedError.category}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-orange-500" />
                Problem Description
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                {selectedError.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                Solution & Learning
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-400">
                {selectedError.solution}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Logged on {new Date(selectedError.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Error Logs</h1>
        <p className="text-gray-600 dark:text-gray-300">Review and manage your programming errors</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search errors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredErrors.length}</span> of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{mockErrorLogs.length}</span> error logs
        </p>
      </div>

      {/* Error Cards Grid */}
      {filteredErrors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredErrors.map(error => (
            <ErrorCard key={error.id} error={error} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No errors found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}

      <ErrorDetailModal />
    </div>
  );
};