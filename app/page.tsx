'use client';

import { useState, useEffect } from 'react';
import {
  Brain,
  Activity,
  Target,
  Calendar,
  TrendingUp,
  Heart,
  Coffee,
  Moon,
  Dumbbell,
  CheckCircle2,
  Clock,
  Zap,
  MessageSquare,
  Plus,
  X
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, subDays } from 'date-fns';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'work' | 'health' | 'personal';
}

interface HealthMetric {
  date: string;
  sleep: number;
  exercise: number;
  water: number;
  mood: number;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Morning workout', completed: false, priority: 'high', category: 'health' },
    { id: '2', text: 'Review project proposal', completed: false, priority: 'high', category: 'work' },
    { id: '3', text: 'Drink 8 glasses of water', completed: false, priority: 'medium', category: 'health' },
  ]);

  const [newTask, setNewTask] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([
    { role: 'ai', content: 'Hello! I\'m your AI wellness companion. How can I help you optimize your productivity and health today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      date: format(subDays(new Date(), 6 - i), 'MMM dd'),
      sleep: Math.floor(Math.random() * 3) + 6,
      exercise: Math.floor(Math.random() * 40) + 20,
      water: Math.floor(Math.random() * 4) + 4,
      mood: Math.floor(Math.random() * 3) + 7,
    }));
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const productivityData = [
    { day: 'Mon', tasks: 8, focus: 85 },
    { day: 'Tue', tasks: 12, focus: 92 },
    { day: 'Wed', tasks: 10, focus: 78 },
    { day: 'Thu', tasks: 15, focus: 88 },
    { day: 'Fri', tasks: 11, focus: 95 },
    { day: 'Sat', tasks: 6, focus: 70 },
    { day: 'Sun', tasks: 4, focus: 65 },
  ];

  const categoryData = [
    { name: 'Work', value: 45, color: '#3b82f6' },
    { name: 'Health', value: 30, color: '#10b981' },
    { name: 'Personal', value: 25, color: '#8b5cf6' },
  ];

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
        priority: 'medium',
        category: 'personal'
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');

    // Simulated AI responses
    setTimeout(() => {
      let aiResponse = '';
      const lowerInput = userMessage.toLowerCase();

      if (lowerInput.includes('sleep') || lowerInput.includes('tired')) {
        aiResponse = 'Based on your sleep data, you\'re averaging 6.8 hours. I recommend aiming for 7-8 hours. Try setting a consistent bedtime routine and avoiding screens 1 hour before bed.';
      } else if (lowerInput.includes('productivity') || lowerInput.includes('focus')) {
        aiResponse = 'Your focus score has been highest on Fridays (95%). Consider using the Pomodoro Technique: 25 minutes of focused work followed by 5-minute breaks. Also, your productivity peaks correlate with days you exercise in the morning.';
      } else if (lowerInput.includes('exercise') || lowerInput.includes('workout')) {
        aiResponse = 'Great question! Your exercise data shows consistency with an average of 32 minutes daily. For optimal health, aim for 30-60 minutes of moderate activity. Morning workouts seem to boost your productivity by 15% based on your patterns.';
      } else if (lowerInput.includes('water') || lowerInput.includes('hydration')) {
        aiResponse = 'You\'re averaging 6.4 glasses of water daily. Aim for 8 glasses. Set reminders every 2 hours, and drink a glass immediately after waking up. Proper hydration can improve focus by up to 20%.';
      } else if (lowerInput.includes('stress') || lowerInput.includes('overwhelm')) {
        aiResponse = 'I notice you have 3 high-priority tasks today. Let\'s break them down: Start with your morning workout (boosts mental clarity), then tackle the project proposal during your peak focus hours (10-11 AM based on your patterns). Schedule regular 10-minute breaks.';
      } else if (lowerInput.includes('goal') || lowerInput.includes('improve')) {
        aiResponse = 'Based on your data, here are 3 quick wins: 1) Increase sleep to 7.5 hours for better recovery, 2) Front-load important tasks before noon when your focus is highest, 3) Add a 10-minute evening walk to improve sleep quality by 25%.';
      } else {
        aiResponse = 'I can help you with productivity optimization, health tracking, task prioritization, sleep analysis, and personalized recommendations. What specific aspect would you like to explore?';
      }

      setChatMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 800);
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Wellness AI Hub
                </h1>
                <p className="text-gray-600">Your intelligent productivity & health companion</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-gray-800">
                {format(currentTime, 'HH:mm:ss')}
              </div>
              <div className="text-sm text-gray-600">
                {format(currentTime, 'EEEE, MMMM d, yyyy')}
              </div>
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-dark rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-6 h-6 text-blue-500" />
              <span className="text-2xl font-bold text-blue-600">{completionRate}%</span>
            </div>
            <p className="text-sm text-gray-600">Task Completion</p>
          </div>

          <div className="glass-dark rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Moon className="w-6 h-6 text-indigo-500" />
              <span className="text-2xl font-bold text-indigo-600">6.8h</span>
            </div>
            <p className="text-sm text-gray-600">Avg Sleep</p>
          </div>

          <div className="glass-dark rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Dumbbell className="w-6 h-6 text-green-500" />
              <span className="text-2xl font-bold text-green-600">32m</span>
            </div>
            <p className="text-sm text-gray-600">Daily Exercise</p>
          </div>

          <div className="glass-dark rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-yellow-600">85</span>
            </div>
            <p className="text-sm text-gray-600">Focus Score</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tasks & AI Chat */}
          <div className="lg:col-span-2 space-y-8">
            {/* Task Manager */}
            <div className="glass-dark rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-blue-500" />
                  Today's Tasks
                </h2>
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  {completedTasks}/{tasks.length} completed
                </span>
              </div>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  placeholder="Add a new task..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addTask}
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>

              <div className="space-y-3">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      task.completed
                        ? 'bg-gray-50 border-gray-200'
                        : 'bg-white border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                    <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.text}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Productivity Chart */}
            <div className="glass-dark rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                Productivity Trends
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Bar dataKey="tasks" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="focus" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column - AI Chat & Health */}
          <div className="space-y-8">
            {/* AI Assistant Chat */}
            <div className="glass-dark rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-purple-500" />
                AI Assistant
              </h2>

              <div className="h-96 overflow-y-auto mb-4 space-y-4 pr-2">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Task Distribution */}
            <div className="glass-dark rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-green-500" />
                Task Distribution
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm text-gray-600">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Metrics */}
            <div className="glass-dark rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                Health Overview
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={healthMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="sleep" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1' }} />
                  <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <Coffee className="w-5 h-5 text-blue-500 mb-2" />
                  <p className="text-sm text-gray-600">Water Intake</p>
                  <p className="text-xl font-bold text-blue-600">6.4 glasses</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <Activity className="w-5 h-5 text-green-500 mb-2" />
                  <p className="text-sm text-gray-600">Mood Score</p>
                  <p className="text-xl font-bold text-green-600">8.2/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Footer */}
        <div className="mt-8 glass-dark rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            AI Insights & Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2">🎯 Productivity Peak</h4>
              <p className="text-sm text-gray-700">Your focus is highest between 10-11 AM. Schedule critical tasks during this window.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <h4 className="font-semibold text-green-800 mb-2">💪 Exercise Impact</h4>
              <p className="text-sm text-gray-700">Morning workouts correlate with 15% higher productivity. Keep it up!</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <h4 className="font-semibold text-purple-800 mb-2">😴 Sleep Optimization</h4>
              <p className="text-sm text-gray-700">Aim for 7.5 hours of sleep. Your best performance days follow 7+ hour nights.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
