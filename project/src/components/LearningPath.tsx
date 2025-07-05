import React, { useState } from 'react';
import { Target, CheckCircle, Clock, Brain, Star, ArrowRight, Play } from 'lucide-react';

const LearningPath: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState('faang-prep');

  const learningPaths = {
    'faang-prep': {
      title: 'FAANG Interview Preparation',
      description: 'Comprehensive 12-week program for top-tier tech companies',
      duration: '12 weeks',
      difficulty: 'Advanced',
      modules: [
        {
          week: 1,
          title: 'Arrays & Strings Mastery',
          status: 'completed',
          topics: ['Two Pointers', 'Sliding Window', 'Prefix Sums'],
          problems: 15,
          estimatedTime: '8-10 hours'
        },
        {
          week: 2,
          title: 'Linked Lists & Stacks',
          status: 'completed',
          topics: ['Traversal', 'Reversal', 'Stack Operations'],
          problems: 12,
          estimatedTime: '6-8 hours'
        },
        {
          week: 3,
          title: 'Trees & Binary Search',
          status: 'in-progress',
          topics: ['DFS', 'BFS', 'Binary Search Trees'],
          problems: 18,
          estimatedTime: '10-12 hours'
        },
        {
          week: 4,
          title: 'Dynamic Programming Fundamentals',
          status: 'locked',
          topics: ['Memoization', 'Tabulation', 'Optimization'],
          problems: 20,
          estimatedTime: '12-15 hours'
        },
        {
          week: 5,
          title: 'Graph Algorithms',
          status: 'locked',
          topics: ['DFS', 'BFS', 'Shortest Path', 'Topological Sort'],
          problems: 16,
          estimatedTime: '10-12 hours'
        },
        {
          week: 6,
          title: 'Advanced Dynamic Programming',
          status: 'locked',
          topics: ['2D DP', 'State Machines', 'Knapsack Variations'],
          problems: 22,
          estimatedTime: '15-18 hours'
        }
      ]
    },
    'competitive': {
      title: 'Competitive Programming',
      description: 'Build skills for coding contests and competitions',
      duration: '16 weeks',
      difficulty: 'Expert',
      modules: []
    },
    'beginner': {
      title: 'Beginner Foundations',
      description: 'Start your coding journey with solid fundamentals',
      duration: '8 weeks',
      difficulty: 'Beginner',
      modules: []
    }
  };

  const currentPath = learningPaths[selectedPath as keyof typeof learningPaths];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Learning Paths</h2>
        <p className="text-purple-100">Personalized roadmaps tailored to your goals</p>
      </div>

      {/* Path Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(learningPaths).map(([key, path]) => (
          <div
            key={key}
            onClick={() => setSelectedPath(key)}
            className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-200 ${
              selectedPath === key
                ? 'border-purple-500 bg-purple-50/50 shadow-lg'
                : 'border-slate-200 bg-white/60 hover:border-purple-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                selectedPath === key ? 'bg-purple-500' : 'bg-slate-200'
              }`}>
                <Target className={`w-5 h-5 ${selectedPath === key ? 'text-white' : 'text-slate-500'}`} />
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${
                path.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                path.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                {path.difficulty}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">{path.title}</h3>
            <p className="text-sm text-slate-600 mb-4">{path.description}</p>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{path.duration}</span>
              </div>
              {selectedPath === key && (
                <div className="flex items-center space-x-1 text-purple-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Selected</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Current Path Details */}
      {selectedPath === 'faang-prep' && (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">{currentPath.title}</h3>
              <p className="text-slate-600">{currentPath.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">33%</div>
              <div className="text-sm text-slate-500">Progress</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" style={{ width: '33%' }} />
          </div>

          {/* Learning Modules */}
          <div className="space-y-4">
            {currentPath.modules.map((module, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 border-2 transition-all duration-200 ${
                  module.status === 'completed' ? 'border-green-200 bg-green-50/50' :
                  module.status === 'in-progress' ? 'border-purple-200 bg-purple-50/50' :
                  'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold ${
                      module.status === 'completed' ? 'bg-green-500 text-white' :
                      module.status === 'in-progress' ? 'bg-purple-500 text-white' :
                      'bg-slate-300 text-slate-500'
                    }`}>
                      {module.week}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{module.title}</h4>
                      <p className="text-sm text-slate-600">{module.estimatedTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {module.status === 'completed' && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                    {module.status === 'in-progress' && (
                      <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Continue</span>
                      </button>
                    )}
                    {module.status === 'locked' && (
                      <div className="px-4 py-2 bg-slate-200 text-slate-500 rounded-lg">
                        Locked
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-slate-700 mb-2">Topics Covered</h5>
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, topicIndex) => (
                        <span key={topicIndex} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-slate-700 mb-2">Problems</h5>
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{module.problems} coding problems</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Steps */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
              <ArrowRight className="w-5 h-5 text-blue-500 mr-2" />
              Next Steps
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              You're currently working on Trees & Binary Search. Focus on completing DFS and BFS problems before moving to Dynamic Programming.
            </p>
            <div className="flex items-center space-x-4">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Continue Learning
              </button>
              <button className="px-6 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                View Problems
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPath;