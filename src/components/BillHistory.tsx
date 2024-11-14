import React from 'react';
import { Receipt } from 'lucide-react';
import type { Bill } from '../types';

interface Props {
  bills: Bill[];
}

export default function BillHistory({ bills }: Props) {
  if (bills.length === 0) return null;

  const calculateShare = (bill: Bill) => (bill.totalAmount / bill.people.length).toFixed(2);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Receipt className="text-blue-600" />
        ประวัติบิล
      </h2>
      
      <div className="space-y-4">
        {bills.map((bill) => (
          <div key={bill.id} className="bg-gray-50 p-4 rounded-xl space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{bill.description}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(bill.date).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <span className="text-lg font-bold text-blue-600">
                ฿{bill.totalAmount.toFixed(2)}
              </span>
            </div>
            
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">หารคนละ ฿{calculateShare(bill)}</p>
              <div className="flex flex-wrap gap-2">
                {bill.people.map((person) => (
                  <span
                    key={person.id}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {person.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}