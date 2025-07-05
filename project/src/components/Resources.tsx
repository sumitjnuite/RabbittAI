import React, { useState } from 'react';
import { BookOpen, Video, FileText, ExternalLink, Search, Filter, Star, Clock } from 'lucide-react';

const Resources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Resources', count: 124 },
    { id: 'algorithms', label: 'Algorithms', count: 45 },
    { id: 'data-structures', label: 'Data Structures', count: 38 },
    { id: 'patterns', label: 'Patterns', count: 28 },
    { id: 'interview-tips', label: 'Interview Tips', count: 13 },
  ];

  const resources = [
    {
      id: 1,
      title: 'Two Pointers Technique Masterclass',
      type: 'video',
      category: 'patterns',
      provider: 'NeetCode',
      duration: '45 min',
      difficulty: 'Medium',
      rating: 4.9,
      description: 'Master the two pointers technique with real examples and practice problems.',
      tags: ['Arrays', 'Strings', 'Optimization'],
      url: '#',
      thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Dynamic Programming Patterns Guide',
      type: 'article',
      category: 'algorithms',
      provider: 'LeetCode',
      duration: '30 min read',
      difficulty: 'Hard',
      rating: 4.8,
      description: 'Comprehensive guide to identifying and solving DP problems.',
      tags: ['Dynamic Programming', 'Memoization', 'Tabulation'],
      url: '#',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Binary Tree Traversal Visualization',
      type: 'interactive',
      category: 'data-structures',
      provider: 'VisuAlgo',
      duration: 'Interactive',
      difficulty: 'Medium',
      rating: 4.7,
      description: 'Interactive tool to visualize different tree traversal algorithms.',
      tags: ['Trees', 'DFS', 'BFS', 'Visualization'],
      url: '#',
      thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'FAANG Interview Experience',
      type: 'article',
      category: 'interview-tips',
      provider: 'Blind',
      duration: '15 min read',
      difficulty: 'Easy',
      rating: 4.6,
      description: 'Real interview experiences from successful candidates.',
      tags: ['Interview', 'Experience', 'Tips'],
      url: '#',
      thumbnail: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      title: 'Graph Algorithms Deep Dive',
      type: 'video',
      category: 'algorithms',
      provider: 'MIT OpenCourseWare',
      duration: '90 min',
      difficulty: 'Hard',
      rating: 4.9,
      description: 'Complete overview of graph algorithms including DFS, BFS, and shortest path.',
      tags: ['Graphs', 'DFS', 'BFS', 'Dijkstra'],
      url: '#',
      thumbnail: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      title: 'System Design for Coding Interviews',
      type: 'course',
      category: 'interview-tips',
      provider: 'Grokking',
      duration: '8 hours',
      difficulty: 'Hard',
      rating: 4.8,
      description: 'Complete system design course tailored for coding interviews.',
      tags: ['System Design', 'Scalability', 'Architecture'],
      url: '#',
      thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'article':
        return <FileText className="w-5 h-5" />;
      case 'interactive':
        return <BookOpen className="w-5 h-5" />;
      case 'course':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-700';
      case 'article':
        return 'bg-blue-100 text-blue-700';
      case 'interactive':
        return 'bg-green-100 text-green-700';
      case 'course':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Learning Resources</h2>
        <p className="text-emerald-100">Curated materials to accelerate your coding journey</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-slate-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200/50 hover:shadow-lg transition-all duration-200 group">
            <div className="relative">
              <img 
                src={resource.thumbnail} 
                alt={resource.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(resource.type)}`}>
                  {getIcon(resource.type)}
                  <span className="capitalize">{resource.type}</span>
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  resource.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  resource.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {resource.difficulty}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-800 line-clamp-1">{resource.title}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-slate-600">{resource.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">{resource.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>{resource.duration}</span>
                </div>
                <span className="text-sm font-medium text-slate-700">{resource.provider}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-4 rounded-xl font-medium hover:shadow-lg transition-shadow flex items-center justify-center space-x-2">
                <span>View Resource</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm font-medium text-blue-700">Algorithm Basics</div>
          </button>
          <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm font-medium text-green-700">Practice Problems</div>
          </button>
          <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🧠</div>
            <div className="text-sm font-medium text-purple-700">Pattern Recognition</div>
          </button>
          <button className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">💼</div>
            <div className="text-sm font-medium text-orange-700">Interview Prep</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resources;