import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Download, 
  RefreshCw, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Building2,
  Users,
  Settings,
  Target,
  FileText,
  ChevronRight,
  ChevronDown,
  X
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ProgressChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const SustainabilityDashboard = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showAlerts, setShowAlerts] = useState(false);
  const [filters, setFilters] = useState({
    timeRange: 'today',
    unit: 'all',
    department: 'all',
    machine: 'all',
    shift: 'all'
  });

  // Mock data for demonstration
  const kpiData = {
    energy: {
      current: 2450,
      target: 2200,
      unit: 'kWh',
      trend: 'up',
      status: 'Exceeding Target',
      color: '#ef4444',
      change: '+12%',
      efficiency: 89
    },
    water: {
      current: 1850,
      target: 2000,
      unit: 'Liters',
      trend: 'down',
      status: 'On Track',
      color: '#06b6d4',
      change: '-8%',
      efficiency: 92
    },
    waste: {
      current: 145,
      target: 120,
      unit: 'kg',
      trend: 'up',
      status: 'Needs Attention',
      color: '#f59e0b',
      change: '+21%',
      efficiency: 76
    },
    emissions: {
      current: 850,
      target: 800,
      unit: 'CO2 kg',
      trend: 'up',
      status: 'Slightly Over',
      color: '#ef4444',
      change: '+6%',
      efficiency: 85
    }
  };

  const overallPerformance = {
    score: 85,
    status: 'Good Performance',
    color: '#22c55e'
  };

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Energy Consumption Spike',
      message: 'Unit A showing 25% increase in energy usage',
      time: '10 mins ago',
      department: 'Production Unit A'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Water Usage Above Normal',
      message: 'Dyeing department exceeding daily targets',
      time: '1 hour ago',
      department: 'Dyeing'
    },
    {
      id: 3,
      type: 'info',
      title: 'Weekly Report Ready',
      message: 'Sustainability report for Week 34 is available',
      time: '2 hours ago',
      department: 'General'
    }
  ];

  const trendData = [
    { name: 'Mon', energy: 2100, water: 1900, waste: 120, emissions: 780 },
    { name: 'Tue', energy: 2200, water: 1850, waste: 135, emissions: 820 },
    { name: 'Wed', energy: 2300, water: 1800, waste: 140, emissions: 850 },
    { name: 'Thu', energy: 2450, water: 1850, waste: 145, emissions: 850 },
    { name: 'Fri', energy: 2380, water: 1820, waste: 142, emissions: 840 },
    { name: 'Sat', energy: 2100, water: 1750, waste: 125, emissions: 790 },
    { name: 'Sun', energy: 1950, water: 1700, waste: 115, emissions: 750 }
  ];

  const departmentData = [
    { name: 'Spinning', energy: 650, water: 400, waste: 35, emissions: 220 },
    { name: 'Weaving', energy: 580, water: 350, waste: 30, emissions: 190 },
    { name: 'Dyeing', energy: 720, water: 750, waste: 45, emissions: 280 },
    { name: 'Finishing', energy: 500, water: 350, waste: 35, emissions: 160 }
  ];

  const radarData = [
    { subject: 'Energy', A: 89, B: 110, fullMark: 150 },
    { subject: 'Water', A: 92, B: 130, fullMark: 150 },
    { subject: 'Waste', A: 76, B: 130, fullMark: 150 },
    { subject: 'Emissions', A: 85, B: 130, fullMark: 150 }
  ];

  const KPITile = ({ metric, data, onClick }) => (
    <div 
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
      onClick={() => onClick(metric)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 capitalize">{metric}</h3>
        {data.trend === 'up' ? 
          <TrendingUp className={`h-5 w-5 ${data.color === '#ef4444' ? 'text-red-500' : 'text-green-500'}`} /> :
          <TrendingDown className={`h-5 w-5 ${data.color === '#06b6d4' ? 'text-cyan-500' : 'text-green-500'}`} />
        }
      </div>
      
      <div className="mb-3">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">{data.current.toLocaleString()}</span>
          <span className="ml-2 text-sm text-gray-500">{data.unit}</span>
        </div>
        <div className="flex items-center mt-1">
          <span className={`text-sm font-medium ${data.trend === 'down' && data.color === '#06b6d4' ? 'text-green-600' : data.color === '#ef4444' ? 'text-red-600' : 'text-yellow-600'}`}>
            {data.change}
          </span>
          <span className="ml-2 text-sm text-gray-500">vs target</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Efficiency</span>
          <span className="text-sm font-medium">{data.efficiency}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${data.efficiency}%`,
              backgroundColor: data.efficiency > 90 ? '#22c55e' : data.efficiency > 80 ? '#f59e0b' : '#ef4444'
            }}
          ></div>
        </div>
      </div>

      <p className={`text-sm font-medium ${data.color === '#ef4444' ? 'text-red-600' : data.color === '#06b6d4' ? 'text-cyan-600' : data.color === '#22c55e' ? 'text-green-600' : 'text-yellow-600'}`}>
        {data.status}
      </p>
    </div>
  );

  const OverallTile = ({ data, onClick }) => (
    <div 
      className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-blue-200"
      onClick={() => onClick('overall')}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Overall Performance</h3>
        <Target className="h-5 w-5 text-blue-600" />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline mb-2">
            <span className="text-4xl font-bold text-blue-900">{data.score}</span>
            <span className="ml-2 text-sm text-blue-600">/ 100</span>
          </div>
          <p className="text-blue-700 font-medium">{data.status}</p>
        </div>
        
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis angle={90} domain={[0, 150]} tick={false} />
              <Radar name="Current" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const AlertPanel = () => (
    <div className="fixed right-4 top-20 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Alerts & Notifications</h3>
        <button 
          onClick={() => setShowAlerts(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="overflow-y-auto max-h-80">
        {alerts.map(alert => (
          <div key={alert.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                {alert.type === 'critical' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                {alert.type === 'info' && <CheckCircle className="h-5 w-5 text-blue-500" />}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">{alert.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{alert.department}</span>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FilterBar = () => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        
        <select 
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.timeRange}
          onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>

        <select 
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.unit}
          onChange={(e) => setFilters({...filters, unit: e.target.value})}
        >
          <option value="all">All Units</option>
          <option value="unit-a">Unit A</option>
          <option value="unit-b">Unit B</option>
          <option value="unit-c">Unit C</option>
        </select>

        <select 
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.department}
          onChange={(e) => setFilters({...filters, department: e.target.value})}
        >
          <option value="all">All Departments</option>
          <option value="spinning">Spinning</option>
          <option value="weaving">Weaving</option>
          <option value="dyeing">Dyeing</option>
          <option value="finishing">Finishing</option>
        </select>

        <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>
    </div>
  );

  const InsightView = ({ metric }) => {
    const data = metric === 'overall' ? overallPerformance : kpiData[metric];
    const chartColor = metric === 'overall' ? '#3b82f6' : data.color;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentView('overview')}
              className="text-blue-600 hover:text-blue-800 mr-4"
            >
              ← Back to Overview
            </button>
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {metric === 'overall' ? 'Overall Performance' : `${metric} Insights`}
            </h2>
          </div>
          
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center text-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Status */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Status</h3>
            {metric !== 'overall' ? (
              <>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {data.current.toLocaleString()} {data.unit}
                </div>
                <div className="flex items-center">
                  <span className={`text-lg font-medium ${data.color === '#ef4444' ? 'text-red-600' : data.color === '#06b6d4' ? 'text-cyan-600' : data.color === '#22c55e' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {data.change}
                  </span>
                  <span className="ml-2 text-gray-600">from target</span>
                </div>
              </>
            ) : (
              <>
                <div className="text-3xl font-bold text-gray-900 mb-2">{data.score}/100</div>
                <div className="text-lg text-blue-600 font-medium">{data.status}</div>
              </>
            )}
          </div>

          {/* Goal Progress */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Goal Progress</h3>
            {metric !== 'overall' ? (
              <>
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Target: {data.target} {data.unit}</span>
                    <span className="text-sm font-medium">{Math.round((data.current / data.target) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min((data.current / data.target) * 100, 100)}%`,
                        backgroundColor: data.current > data.target ? '#ef4444' : '#22c55e'
                      }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {data.current > data.target ? `${(data.current - data.target).toLocaleString()} ${data.unit} over target` : 
                   `${(data.target - data.current).toLocaleString()} ${data.unit} under target`}
                </p>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Target: 90+</span>
                    <span className="text-sm font-medium">{data.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${data.score}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">5 points below excellent</p>
              </>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                📊 View Detailed Analytics
              </button>
              <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                ⚡ Set Custom Alert
              </button>
              <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                📝 Add Note/Comment
              </button>
              <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                📋 Create Action Item
              </button>
            </div>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">7-Day Trend Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey={metric === 'overall' ? 'energy' : metric} 
                  stroke={chartColor} 
                  strokeWidth={3}
                  dot={{ fill: chartColor, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Department Breakdown</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey={metric === 'overall' ? 'energy' : metric} 
                  fill={chartColor}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  if (currentView === 'insights' && selectedMetric) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="p-6">
          <FilterBar />
          <InsightView metric={selectedMetric} />
        </div>
        {showAlerts && <AlertPanel />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sustainability Dashboard</h1>
              <p className="text-gray-600">Real-time monitoring of environmental metrics</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                Last updated: {new Date().toLocaleTimeString()}
              </div>
              
              <button 
                onClick={() => setShowAlerts(!showAlerts)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="h-5 w-5" />
                {alerts.filter(a => a.type === 'critical').length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {alerts.filter(a => a.type === 'critical').length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <FilterBar />

        {/* KPI Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <OverallTile 
            data={overallPerformance} 
            onClick={(metric) => {
              setSelectedMetric(metric);
              setCurrentView('insights');
            }}
          />
          
          {Object.entries(kpiData).map(([metric, data]) => (
            <KPITile 
              key={metric}
              metric={metric}
              data={data}
              onClick={(metric) => {
                setSelectedMetric(metric);
                setCurrentView('insights');
              }}
            />
          ))}
        </div>

        {/* Summary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="energy" stroke="#ef4444" strokeWidth={2} name="Energy (kWh)" />
                  <Line type="monotone" dataKey="water" stroke="#06b6d4" strokeWidth={2} name="Water (L)" />
                  <Line type="monotone" dataKey="waste" stroke="#f59e0b" strokeWidth={2} name="Waste (kg)" />
                  <Line type="monotone" dataKey="emissions" stroke="#8b5cf6" strokeWidth={2} name="Emissions (CO2 kg)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Department Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="energy" fill="#ef4444" name="Energy (kWh)" />
                  <Bar dataKey="water" fill="#06b6d4" name="Water (L)" />
                  <Bar dataKey="waste" fill="#f59e0b" name="Waste (kg)" />
                  <Bar dataKey="emissions" fill="#8b5cf6" name="Emissions (CO2 kg)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Sustainability Goals Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(kpiData).map(([metric, data]) => (
              <div key={metric} className="text-center">
                <h4 className="font-medium text-gray-800 capitalize mb-3">{metric}</h4>
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-300"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="3"
                      d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-blue-600"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="3"
                      strokeDasharray={`${data.efficiency}, 100`}
                      d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-900">{data.efficiency}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{data.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAlerts && <AlertPanel />}
    </div>
  );
};

export default SustainabilityDashboard;