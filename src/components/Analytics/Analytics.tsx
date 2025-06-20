import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp,
  Code, 
  AlertTriangle, 
  Target,
  Brain,
  Clock,
  Award,
  Activity
} from 'lucide-react';
import { apiService } from '../../service/api';

export const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await apiService.getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    gradient: string;
    description?: string;
    trend?: string;
  }> = ({ title, value, icon: Icon, gradient, description, trend }) => (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-white/5 rounded-full"></div>
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            {description && (
              <p className="text-white/70 text-xs mt-1">{description}</p>
            )}
            {trend && (
              <p className="text-white/90 text-xs mt-2 font-medium">{trend}</p>
            )}
          </div>
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsCard: React.FC<{
    title: string;
    icon: React.ComponentType<any>;
    children: React.ReactNode;
    iconColor: string;
  }> = ({ title, icon: Icon, children, iconColor }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-2 mb-6">
        <div className={`p-2 ${iconColor} rounded-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      </div>
      {children}
    </div>
  );

  const ProgressBar: React.FC<{
    label: string;
    value: number;
    total: number;
    color: string;
  }> = ({ label, value, total, color }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">{value} errors</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">({percentage.toFixed(1)}%)</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className={`${color} h-3 rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No analytics data available</h3>
          <p className="text-gray-500 dark:text-gray-400">Start logging errors to see your analytics</p>
        </div>
      </div>
    );
  }

  const topLanguage = analytics.languageStats[0];
  const topCategory = analytics.categoryStats[0];
  const thisWeekErrors = analytics.recentErrors.filter((error: any) => {
    const errorDate = new Date(error.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return errorDate >= weekAgo;
  }).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-300">Deep insights into your programming error patterns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Errors Logged"
          value={analytics.totalErrors}
          icon={Code}
          gradient="from-purple-500 to-purple-600"
          description="All time"
          trend={`+${thisWeekErrors} this week`}
        />
        <StatCard
          title="Most Common Language"
          value={topLanguage?.language || 'N/A'}
          icon={TrendingUp}
          gradient="from-blue-500 to-blue-600"
          description={`${topLanguage?.count || 0} errors`}
          trend={`${topLanguage?.language || 'No'} leads`}
        />
        <StatCard
          title="Top Error Type"
          value={topCategory?.category || 'N/A'}
          icon={AlertTriangle}
          gradient="from-teal-500 to-teal-600"
          description={`${topCategory?.count || 0} occurrences`}
          trend="Focus area identified"
        />
        <StatCard
          title="Learning Progress"
          value="85%"
          icon={Brain}
          gradient="from-orange-500 to-orange-600"
          description="Improvement rate"
          trend="Great progress!"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Programming Languages Breakdown */}
        <AnalyticsCard
          title="Errors by Programming Language"
          icon={Code}
          iconColor="bg-purple-500"
        >
          <div className="space-y-4">
            {analytics.languageStats.slice(0, 5).map((stat: any, index: number) => (
              <ProgressBar
                key={stat.language}
                label={stat.language}
                value={stat.count}
                total={analytics.totalErrors}
                color={`bg-gradient-to-r ${
                  index === 0 ? 'from-purple-500 to-purple-600' :
                  index === 1 ? 'from-blue-500 to-blue-600' :
                  index === 2 ? 'from-teal-500 to-teal-600' :
                  index === 3 ? 'from-orange-500 to-orange-600' :
                  'from-gray-500 to-gray-600'
                }`}
              />
            ))}
          </div>
        </AnalyticsCard>

        {/* Error Categories Breakdown */}
        <AnalyticsCard
          title="Errors by Category"
          icon={Target}
          iconColor="bg-teal-500"
        >
          <div className="space-y-4">
            {analytics.categoryStats.slice(0, 5).map((stat: any, index: number) => (
              <ProgressBar
                key={stat.category}
                label={stat.category}
                value={stat.count}
                total={analytics.totalErrors}
                color={`bg-gradient-to-r ${
                  index === 0 ? 'from-teal-500 to-teal-600' :
                  index === 1 ? 'from-green-500 to-green-600' :
                  index === 2 ? 'from-blue-500 to-blue-600' :
                  index === 3 ? 'from-purple-500 to-purple-600' :
                  'from-gray-500 to-gray-600'
                }`}
              />
            ))}
          </div>
        </AnalyticsCard>

        {/* Monthly Trend */}
        <AnalyticsCard
          title="Monthly Error Trend"
          icon={BarChart3}
          iconColor="bg-blue-500"
        >
          <div className="space-y-4">
            {analytics.monthlyStats.slice(0, 6).map((stat: any) => {
              const monthName = new Date(stat.year, stat.month - 1).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short' 
              });
              const maxCount = Math.max(...analytics.monthlyStats.map((s: any) => s.count));
              return (
                <div key={`${stat.year}-${stat.month}`} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{monthName}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                        style={{ width: `${(stat.count / maxCount) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-8 text-right">{stat.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </AnalyticsCard>

        {/* Learning Insights */}
        <AnalyticsCard
          title="Learning Insights"
          icon={Award}
          iconColor="bg-orange-500"
        >
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-800 dark:text-green-300">Strengths</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-400">
                You're getting better at avoiding Runtime Errors. Keep it up!
              </p>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Focus Areas</span>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                {topCategory?.category || 'Error logging'} seems to be your main challenge. Consider reviewing best practices.
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Recommendation</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Focus on {topLanguage?.language || 'programming'} fundamentals to reduce common errors.
              </p>
            </div>
          </div>
        </AnalyticsCard>
      </div>
    </div>
  );
};