import React from 'react';
import { TrendingUp, Award, Target, Calendar, CheckCircle, Clock } from 'lucide-react';

const Progress: React.FC = () => {
  const weeklyProgress = [
    { week: 'Week 1', problems: 12, hours: 8, streak: 7 },
    { week: 'Week 2', problems: 15, hours: 10, streak: 6 },
    { week: 'Week 3', problems: 18, hours: 12, streak: 7 },
    { week: 'Week 4', problems: 22, hours: 15, streak: 7 },
    { week: 'Week 5', problems: 20, hours: 13, streak: 5 },
    { week: 'Week 6', problems: 25, hours: 16, streak: 7 },
  ];

  const skillProgress = [
    { skill: 'Arrays & Strings', current: 95, target: 100, color: 'bg-blue-500' },
    { skill: 'Linked Lists', current: 88, target: 90, color: 'bg-green-500' },
    { skill: 'Trees & Graphs', current: 72, target: 85, color: 'bg-purple-500' },
    { skill: 'Dynamic Programming', current: 45, target: 80, color: 'bg-orange-500' },
    { skill: 'Backtracking', current: 30, target: 70, color: 'bg-red-500' },
    { skill: 'Greedy Algorithms', current: 25, target: 60, color: 'bg-pink-500' },
  ];

  const achievements = [
    { title: '50 Problems Solved', icon: '🎯', date: '2 days ago', color: 'bg-blue-500' },
    { title: '7-Day Streak', icon: '🔥', date: '1 week ago', color: 'bg-orange-500' },
    { title: 'Array Master', icon: '🏆', date: '2 weeks ago', color: 'bg-yellow-500' },
    { title: 'Fast Learner', icon: '⚡', date: '3 weeks ago', color: 'bg-purple-500' },
  ];

  const recentSubmissions = [
    { problem: 'Longest Palindromic Substring', difficulty: 'Medium', status: 'Accepted', time: '2 hours ago', attempts: 3 },
    { problem: 'Valid Parentheses', difficulty: 'Easy', status: 'Accepted', time: '4 hours ago', attempts: 1 },
    { problem: 'Merge Intervals', difficulty: 'Medium', status: 'Accepted', time: '1 day ago', attempts: 2 },
    { problem: 'Binary Tree Inorder Traversal', difficulty: 'Medium', status: 'Accepted', time: '2 days ago', attempts: 1 },
    { problem: 'Container With Most Water', difficulty: 'Medium', status: 'Wrong Answer', time: '2 days ago', attempts: 4 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Progress Tracking</h2>
        <p className="text-green-100">Monitor your learning journey and celebrate achievements</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-green-600 font-medium">+15 this week</span>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1">147</div>
          <div className="text-sm text-slate-600">Problems Solved</div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-orange-600 font-medium">Current</span>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1">12</div>
          <div className="text-sm text-slate-600">Day Streak</div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-green-600 font-medium">Improving</span>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1">68%</div>
          <div className="text-sm text-slate-600">Success Rate</div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-purple-600 font-medium">This month</span>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1">84</div>
          <div className="text-sm text-slate-600">Hours Practiced</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Progress Chart */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Weekly Progress</h3>
          <div className="space-y-4">
            {weeklyProgress.map((week, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{week.week}</div>
                    <div className="text-sm text-slate-600">{week.problems} problems • {week.hours}h</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-slate-600">{week.streak} days</div>
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-lg">🔥</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Progress */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Skill Progress</h3>
          <div className="space-y-6">
            {skillProgress.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{skill.skill}</span>
                  <span className="text-sm text-slate-500">{skill.current}% / {skill.target}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="relative">
                    <div 
                      className={`h-2 rounded-full ${skill.color} transition-all duration-500`}
                      style={{ width: `${skill.current}%` }}
                    />
                    <div 
                      className="absolute top-0 w-1 h-2 bg-slate-400 rounded-full"
                      style={{ left: `${skill.target}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 border border-slate-200/50 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className={`w-12 h-12 ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-2xl">{achievement.icon}</span>
                </div>
                <h4 className="font-semibold text-slate-800 mb-1">{achievement.title}</h4>
                <p className="text-xs text-slate-500">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Recent Submissions</h3>
        <div className="space-y-3">
          {recentSubmissions.map((submission, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  submission.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <div>
                  <div className="font-medium text-slate-800">{submission.problem}</div>
                  <div className="text-sm text-slate-600">{submission.time}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  submission.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  submission.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {submission.difficulty}
                </span>
                <span className="text-sm text-slate-500">{submission.attempts} attempts</span>
                <span className={`text-sm font-medium ${
                  submission.status === 'Accepted' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {submission.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;