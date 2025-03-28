'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { BrandData } from '@/types/brand';

export default function CompanyHeader() {
  const [companyData, setCompanyData] = useState<BrandData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get('/api/company');
        setCompanyData(response.data);
      } catch (err) {
        setError('Failed to load company data');
        console.error('Error fetching company data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) {
    return <div className="animate-pulse h-20 bg-gray-100 rounded-lg"></div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!companyData) {
    return null;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
            <p className="text-sm text-gray-500">
              Total API Calls: {companyData.totalCalls.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Success Rate</p>
            <p className="text-xl font-semibold text-green-600">
              {((companyData.successfulCalls / companyData.totalCalls) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Error Rate</p>
            <p className="text-xl font-semibold text-red-600">
              {companyData.errorRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
