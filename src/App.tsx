import React, { useState } from 'react';
import type { Bill } from './types';
import BillForm from './components/BillForm';
import BillHistory from './components/BillHistory';
import Summary from './components/Summary';

function App() {
  const [bills, setBills] = useState<Bill[]>([]);

  const handleSaveBill = (newBill: Omit<Bill, 'id'>) => {
    setBills(prev => [...prev, { ...newBill, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">แอพหารเงิน</h1>
          <p className="text-gray-600 mt-2">หารบิลง่ายๆ ไม่มี ไม่หนี ไม่จ่าย</p>
        </div>

        <div className="space-y-8">
          <BillForm onSaveBill={handleSaveBill} />
          <Summary bills={bills} />
          <BillHistory bills={bills} />
        </div>
      </div>
    </div>
  );
}

export default App;