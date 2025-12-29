'use client';

import { useEffect, useState } from 'react';
import { MapPin, MessageSquare, Users } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    destinations: 0,
    testimonials: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [destRes, testRes] = await Promise.all([
          fetch('/api/destinations'),
          fetch('/api/testimonials'),
        ]);

        const destData = await destRes.json();
        const testData = await testRes.json();

        setStats({
          destinations: destData.data?.length || 0,
          testimonials: testData.data?.length || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);


  const cards = [
    {
      title: 'Total Destinations',
      value: stats.destinations,
      icon: MapPin,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Testimonials',
      value: stats.testimonials,
      icon: MessageSquare,
      color: 'bg-green-500',
    },
    {
      title: 'Total Users',
      value: '1',
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}