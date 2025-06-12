import React, { useMemo } from 'react';
import { Code, AlertTriangle, TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { mockErrorLogs } from '../../data/mockData';
import { ErrorLog } from '../../types';

export const Dashboard: React.FC = () => {
  const analytics = useMemo(() => {
    const totalErrors = mockErrorLogs.length;
    const languageStats = mockErrorLogs.reduce((acc, error) => {
      acc[error.programmingLanguage] = (acc[error.programmingLanguage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categoryStats = mockErrorLogs.reduce((acc, error) => {
      acc[error.category] = (acc[error.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topLanguage = Object.entries(languageStats).sort(([,a], [,b]) => b - a)[0];
    const topCategory = Object.entries(categoryStats).sort(([,a], [,b]) => b - a)[0];

    const recentErrors = mockErrorLogs
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    return {
      totalErrors,
      languageStats,
      categoryStats,
      topLanguage,
      topCategory,
      recentErrors
    };
  }, []);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    gradient: string;
    description?: string;
  }> = ({ title, value, icon: Icon, gradient, description }) => (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-white/10 rounded-full"></div>
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {description && (
              <p className="text-white/70 text-xs mt-1">{description}</p>
            )}
          </div>
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your programming errors and improve your coding skills</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Errors"
          value={analytics.totalErrors}
          icon={Code}
          gradient="from-purple-500 to-purple-600"
          description="Logged so far"
        />
        <StatCard
          title="Most Common Language"
          value={analytics.topLanguage?.[0] || 'N/A'}
          icon={TrendingUp}
          gradient="from-blue-500 to-blue-600"
          description={`${analytics.topLanguage?.[1] || 0} errors`}
        />
        <StatCard
          title="Top Error Category"
          value={analytics.topCategory?.[0] || 'N/A'}
          icon={AlertTriangle}
          gradient="from-teal-500 to-teal-600"
          description={`${analytics.topCategory?.[1] || 0} occurrences`}
        />
        <StatCard
          title="This Week"
          value="3"
          icon={Calendar}
          gradient="from-orange-500 to-orange-600"
          description="New errors logged"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Programming Languages Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center space-x-2 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Code className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Errors by Language</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(analytics.languageStats)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 6)
              .map(([language, count]) => {
                const percentage = (count / analytics.totalErrors) * 100;
                return (
                  <div key={language} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{language}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{count} errors</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Error Categories Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center space-x-2 mb-6">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
              <Target className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Errors by Category</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(analytics.categoryStats)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 6)
              .map(([category, count]) => {
                const percentage = (count / analytics.totalErrors) * 100;
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{count} errors</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Recent Errors */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <Award className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Error Logs</h2>
        </div>
        <div className="space-y-4">
          {analytics.recentErrors.map((error, index) => (
            <div
              key={error.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">{error.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">{error.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                    {error.programmingLanguage}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                    {error.category}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(error.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};