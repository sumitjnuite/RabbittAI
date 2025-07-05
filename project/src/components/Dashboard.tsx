import React, { useEffect, useState } from 'react';
import { TrendingUp, Award, Target, Clock, CheckCircle, AlertCircle, BookOpen, Code, Sparkles, Brain } from 'lucide-react';
import { geminiAnalyzer } from '../services/geminiService';

interface DashboardProps {
  userData: {
    name: string;
    level: string;
    completedProblems: number;
    streak: number;
    targetCompany: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  const [aiRecommendations, setAiRecommendations] = useState<any>(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  const recentActivity = [
    { problem: 'Two Sum', difficulty: 'Easy', status: 'completed', time: '2 hours ago' },
    { problem: 'Longest Substring', difficulty: 'Medium', status: 'attempted', time: '5 hours ago' },
    { problem: 'Merge Intervals', difficulty: 'Medium', status: 'completed', time: '1 day ago' },
    { problem: 'Binary Tree Inorder', difficulty: 'Medium', status: 'completed', time: '2 days ago' },
  ];

  const recommendations = [
    {
      title: 'Array & String Patterns',
      description: 'Focus on two-pointer techniques and sliding window problems',
      priority: 'High',
      estimatedTime: '3-4 hours',
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Dynamic Programming',
      description: 'Master memoization and tabulation approaches',
      priority: 'Medium',
      estimatedTime: '5-6 hours',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Tree Traversal',
      description: 'Strengthen DFS and BFS implementation skills',
      priority: 'Low',
      estimatedTime: '2-3 hours',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const skillBreakdown = [
    { category: 'Arrays', progress: 85, color: 'bg-blue-500' },
    { category: 'Strings', progress: 78, color: 'bg-green-500' },
    { category: 'Trees', progress: 65, color: 'bg-purple-500' },
    { category: 'Graphs', progress: 45, color: 'bg-orange-500' },
    { category: 'DP', progress: 30, color: 'bg-red-500' },
  ];

  useEffect(() => {
    loadAIRecommendations();
  }, []);

  const loadAIRecommendations = async () => {
    setIsLoadingRecommendations(true);
    try {
      const userHistory = recentActivity.map(activity => ({
        problem: activity.problem,
        difficulty: activity.difficulty,
        status: activity.status
      }));
      
      const currentSkills = skillBreakdown.reduce((acc, skill) => {
        acc[skill.category] = skill.progress;
        return acc;
      }, {} as any);

      const aiPlan = await geminiAnalyzer.generateLearningPlan(userHistory, currentSkills);
      setAiRecommendations(aiPlan);
    } catch (error) {
      console.error('Failed to load AI recommendations:', error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Welcome back, {userData.name}!</h2>
        </div>
        <p className="text-blue-100 mb-6">Your AI-powered learning coach is ready to help you level up!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Problems Solved</span>
            </div>
            <p className="text-2xl font-bold">{userData.completedProblems}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">Current Streak</span>
            </div>
            <p className="text-2xl font-bold">{userData.streak} days</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">Target Goal</span>
            </div>
            <p className="text-2xl font-bold">{userData.targetCompany}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Recommendations */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">AI Recommendations</h3>
            </div>
            {isLoadingRecommendations && (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-500 border-t-transparent" />
            )}
          </div>

          {aiRecommendations ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
                  AI-Generated Learning Plan
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  Based on your recent activity and skill levels, here's your personalized plan:
                </p>
                {aiRecommendations.weeklyGoals && (
                  <div className="space-y-2">
                    {aiRecommendations.weeklyGoals.slice(0, 2).map((goal: any, index: number) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-slate-700">Week {goal.week}: {goal.focus}</span>
                        <span className="text-blue-600 font-medium">{goal.problems} problems</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {recommendations.map((rec, index) => (
                <div key={index} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{rec.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      rec.priority === 'High' ? 'bg-red-100 text-red-700' :
                      rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Est. {rec.estimatedTime}</span>
                    <button className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${rec.color} text-white hover:shadow-lg transition-shadow`}>
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{rec.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      rec.priority === 'High' ? 'bg-red-100 text-red-700' :
                      rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Est. {rec.estimatedTime}</span>
                    <button className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${rec.color} text-white hover:shadow-lg transition-shadow`}>
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skill Breakdown */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Skill Progress</h3>
          </div>
          <div className="space-y-4">
            {skillBreakdown.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{skill.category}</span>
                  <span className="text-sm text-slate-500">{skill.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${skill.color} transition-all duration-500`}
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                }`} />
                <div>
                  <p className="font-medium text-slate-800">{activity.problem}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activity.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  activity.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {activity.difficulty}
                </span>
                {activity.status === 'completed' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;