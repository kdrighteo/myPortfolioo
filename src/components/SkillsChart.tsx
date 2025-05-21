'use client';

import { useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { skills } from '@/data/skills';
import { Skill } from '@/lib/types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

type SkillCategory = 'frontend' | 'backend' | 'devops' | 'design' | 'other' | 'all';

const SkillsChart = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [chartType, setChartType] = useState<'bar' | 'radar'>('bar');
  
  const getFilteredSkills = (): Skill[] => {
    if (activeCategory === 'all') {
      // For 'all', get top skills from each category
      const topFrontend = skills
        .filter(skill => skill.category === 'frontend')
        .sort((a, b) => b.level - a.level)
        .slice(0, 3);
        
      const topBackend = skills
        .filter(skill => skill.category === 'backend')
        .sort((a, b) => b.level - a.level)
        .slice(0, 3);
        
      const topDevops = skills
        .filter(skill => skill.category === 'devops')
        .sort((a, b) => b.level - a.level)
        .slice(0, 2);
        
      const topDesign = skills
        .filter(skill => skill.category === 'design')
        .sort((a, b) => b.level - a.level)
        .slice(0, 2);
        
      return [...topFrontend, ...topBackend, ...topDevops, ...topDesign];
    } else {
      // Filter by selected category
      return skills
        .filter(skill => skill.category === activeCategory)
        .sort((a, b) => b.level - a.level);
    }
  };

  const filteredSkills = getFilteredSkills();
  
  const barChartData = {
    labels: filteredSkills.map(skill => skill.name),
    datasets: [
      {
        label: 'Skill Level',
        data: filteredSkills.map(skill => skill.level),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
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
        text: `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Skills`,
        color: '#6B7280',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
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
  
  const radarChartData = {
    labels: filteredSkills.map(skill => skill.name),
    datasets: [
      {
        label: 'Skill Level',
        data: filteredSkills.map(skill => skill.level),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(99, 102, 241)',
      },
    ],
  };
  
  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        pointLabels: {
          color: '#6B7280',
        },
        ticks: {
          backdropColor: 'transparent',
          color: '#6B7280',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Skills`,
        color: '#6B7280',
      },
    },
  };

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-md p-6">
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeCategory === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveCategory('frontend')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeCategory === 'frontend'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300'
          }`}
        >
          Frontend
        </button>
        <button
          onClick={() => setActiveCategory('backend')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeCategory === 'backend'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300'
          }`}
        >
          Backend
        </button>
        <button
          onClick={() => setActiveCategory('devops')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeCategory === 'devops'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300'
          }`}
        >
          DevOps
        </button>
        <button
          onClick={() => setActiveCategory('design')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeCategory === 'design'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300'
          }`}
        >
          Design
        </button>
        <button
          onClick={() => setActiveCategory('other')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeCategory === 'other'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300'
          }`}
        >
          Other
        </button>
      </div>
      
      <div className="flex justify-end mb-6">
        <div className="bg-secondary-100 dark:bg-secondary-700 p-1 rounded-md">
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded-md text-sm ${
              chartType === 'bar'
                ? 'bg-white dark:bg-secondary-600 shadow-sm'
                : 'text-secondary-600 dark:text-secondary-300'
            }`}
          >
            Bar
          </button>
          <button
            onClick={() => setChartType('radar')}
            className={`px-3 py-1 rounded-md text-sm ${
              chartType === 'radar'
                ? 'bg-white dark:bg-secondary-600 shadow-sm'
                : 'text-secondary-600 dark:text-secondary-300'
            }`}
          >
            Radar
          </button>
        </div>
      </div>
      
      <div className="h-[400px]">
        {chartType === 'bar' ? (
          <Bar data={barChartData} options={barOptions} />
        ) : (
          <Radar data={radarChartData} options={radarOptions} />
        )}
      </div>
    </div>
  );
};

export default SkillsChart;
