import React, { useState } from 'react';
import { Code, Brain, Target, BookOpen, TrendingUp, User, Search, Upload, CheckCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CodeAnalysis from './components/CodeAnalysis';
import LearningPath from './components/LearningPath';
import Progress from './components/Progress';
import Resources from './components/Resources';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userData, setUserData] = useState({
    name: 'Sumit Singh',
    level: 'Intermediate',
    completedProblems: 147,
    streak: 12,
    targetCompany: 'Google',
  });

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'analysis', label: 'Code Analysis', icon: Code },
    { id: 'learning', label: 'Learning Path', icon: Target },
    { id: 'progress', label: 'Progress', icon: Brain },
    { id: 'resources', label: 'Resources', icon: BookOpen },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userData={userData} />;
      case 'analysis':
        return <CodeAnalysis />;
      case 'learning':
        return <LearningPath />;
      case 'progress':
        return <Progress />;
      case 'resources':
        return <Resources />;
      default:
        return <Dashboard userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeCoach AI
                </h1>
                <p className="text-xs text-slate-500">Personalized Learning Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search problems..." 
                  className="bg-transparent text-sm outline-none placeholder-slate-400"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-slate-700">{userData.name}</p>
                  <p className="text-xs text-slate-500">{userData.level}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-slate-600 hover:bg-white/50 hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Problems Solved</span>
                  <span className="text-sm font-bold text-slate-700">{userData.completedProblems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Current Streak</span>
                  <span className="text-sm font-bold text-orange-600">{userData.streak} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Target</span>
                  <span className="text-sm font-bold text-blue-600">{userData.targetCompany}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;