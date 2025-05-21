'use client';

import { useState } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { projects } from '@/data/projects';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface LanguageData {
  [key: string]: number;
}

const ProjectAnalytics = () => {
  const [activeTab, setActiveTab] = useState<'languages' | 'categories' | 'commits'>('languages');
  
  // Calculate technology distribution
  const calculateLanguageData = (): { labels: string[], data: number[] } => {
    const languageData: LanguageData = {};
    
    projects.forEach(project => {
      project.technologies.forEach(tech => {
        if (languageData[tech]) {
          languageData[tech]++;
        } else {
          languageData[tech] = 1;
        }
      });
    });
    
    // Sort by frequency
    const sortedEntries = Object.entries(languageData).sort((a, b) => b[1] - a[1]);
    
    // Take top 8, combine the rest into "Other"
    const topEntries = sortedEntries.slice(0, 8);
    const otherCount = sortedEntries.slice(8).reduce((sum, entry) => sum + entry[1], 0);
    
    const labels = topEntries.map(entry => entry[0]);
    const data = topEntries.map(entry => entry[1]);
    
    if (otherCount > 0) {
      labels.push('Other');
      data.push(otherCount);
    }
    
    return { labels, data };
  };
  
  // Calculate project categories
  const calculateCategoryData = (): { labels: string[], data: number[] } => {
    const categoryData: LanguageData = {};
    
    projects.forEach(project => {
      if (categoryData[project.category]) {
        categoryData[project.category]++;
      } else {
        categoryData[project.category] = 1;
      }
    });
    
    const sortedEntries = Object.entries(categoryData).sort((a, b) => b[1] - a[1]);
    const labels = sortedEntries.map(entry => entry[0]);
    const data = sortedEntries.map(entry => entry[1]);
    
    return { labels, data };
  };
  
  // Mock commit data (in a real app, this would come from GitHub API)
  const commitData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [65, 84, 91, 56, 77, 90, 120, 115, 94, 86, 97, 110],
  };
  
  const languageData = calculateLanguageData();
  const categoryData = calculateCategoryData();
  
  // Generate colors for the charts
  const generateColors = (count: number, alpha: number = 0.8) => {
    const baseColors = [
      `rgba(99, 102, 241, ${alpha})`,   // Indigo
      `rgba(79, 70, 229, ${alpha})`,    // Purple
      `rgba(16, 185, 129, ${alpha})`,   // Emerald
      `rgba(245, 158, 11, ${alpha})`,   // Amber
      `rgba(239, 68, 68, ${alpha})`,    // Red
      `rgba(59, 130, 246, ${alpha})`,   // Blue
      `rgba(236, 72, 153, ${alpha})`,   // Pink
      `rgba(251, 146, 60, ${alpha})`,   // Orange
      `rgba(139, 92, 246, ${alpha})`,   // Violet
    ];
    
    // Repeat colors if we need more than we have
    return Array(count).fill(0).map((_, i) => baseColors[i % baseColors.length]);
  };
  
  const doughnutData = {
    labels: activeTab === 'languages' ? languageData.labels : categoryData.labels,
    datasets: [
      {
        data: activeTab === 'languages' ? languageData.data : categoryData.data,
        backgroundColor: generateColors(activeTab === 'languages' ? languageData.labels.length : categoryData.labels.length),
        borderColor: Array(activeTab === 'languages' ? languageData.labels.length : categoryData.labels.length).fill('rgba(255, 255, 255, 0.8)'),
        borderWidth: 2,
      },
    ],
  };
  
  const barData = {
    labels: commitData.labels,
    datasets: [
      {
        label: 'Commits',
        data: commitData.data,
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
  };
  
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#6B7280',
        },
      },
      title: {
        display: true,
        text: activeTab === 'languages' ? 'Technologies Used' : 'Project Categories',
        color: '#6B7280',
      },
    },
  };
  
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'GitHub Contributions (Past Year)',
        color: '#6B7280',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#6B7280',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-md p-6">
      <div className="flex justify-center mb-6">
        <div className="bg-secondary-100 dark:bg-secondary-700 p-1 rounded-md">
          <button
            onClick={() => setActiveTab('languages')}
            className={`px-4 py-2 rounded-md text-sm ${
              activeTab === 'languages'
                ? 'bg-white dark:bg-secondary-600 shadow-sm'
                : 'text-secondary-600 dark:text-secondary-300'
            }`}
          >
            Technologies
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-md text-sm ${
              activeTab === 'categories'
                ? 'bg-white dark:bg-secondary-600 shadow-sm'
                : 'text-secondary-600 dark:text-secondary-300'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('commits')}
            className={`px-4 py-2 rounded-md text-sm ${
              activeTab === 'commits'
                ? 'bg-white dark:bg-secondary-600 shadow-sm'
                : 'text-secondary-600 dark:text-secondary-300'
            }`}
          >
            Commits
          </button>
        </div>
      </div>
      
      <div className="h-[350px] flex items-center justify-center">
        {(activeTab === 'languages' || activeTab === 'categories') && (
          <Doughnut data={doughnutData} options={doughnutOptions} />
        )}
        
        {activeTab === 'commits' && (
          <Bar data={barData} options={barOptions} />
        )}
      </div>
      
      <div className="mt-6 text-center text-secondary-500 dark:text-secondary-400 text-sm">
        Based on {projects.length} projects and their associated technologies
      </div>
    </div>
  );
};

export default ProjectAnalytics;
