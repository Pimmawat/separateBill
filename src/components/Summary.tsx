import React from 'react';
import { Wallet } from 'lucide-react';
import type { Bill } from '../types';

interface Props {
  bills: Bill[];
}

export default function Summary({ bills }: Props) {
  if (bills.length === 0) return null;

  const calculateTotalPerPerson = () => {
    const totals: Record<string, number> = {};
    
    bills.forEach(bill => {
      const share = bill.totalAmount / bill.people.length;
      bill.people.forEach(person => {
        totals[person.name] = (totals[person.name] || 0) + share;
      });
    });

    return Object.entries(totals)
      .sort(([, a], [, b]) => b - a)
      .map(([name, total]) => ({ name, total }));
  };

  const personTotals = calculateTotalPerPerson();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
        <Wallet className="text-green-600" />
        สรุปยอดรวมทั้งหมด
      </h2>
      
      <div className="space-y-3">
        {personTotals.map(({ name, total }) => (
          <div
            key={name}
            className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
          >
            <span className="font-medium text-gray-900">{name}</span>
            <span className="font-bold text-green-600">฿{total.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}