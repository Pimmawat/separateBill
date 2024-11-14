import React, { useState } from 'react';
import { MinusCircle, PlusCircle, Receipt, Users } from 'lucide-react';
import type { Bill, Person } from '../types';

interface Props {
  onSaveBill: (bill: Omit<Bill, 'id'>) => void;
}

export default function BillForm({ onSaveBill }: Props) {
  const [people, setPeople] = useState<Person[]>([
    { id: 1, name: 'คนที่ 1' },
    { id: 2, name: 'คนที่ 2' }
  ]);
  const [totalAmount, setTotalAmount] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const addPerson = () => {
    if (newName.trim()) {
      setPeople([...people, { id: Date.now(), name: newName.trim() }]);
      setNewName('');
    }
  };

  const removePerson = (id: number) => {
    setPeople(people.filter(person => person.id !== id));
  };

  const handleSubmit = () => {
    if (!totalAmount || people.length === 0) return;
    
    onSaveBill({
      totalAmount: parseFloat(totalAmount),
      people: [...people],
      date: new Date().toISOString(),
      description: description || 'บิลไม่มีคำอธิบาย'
    });

    // Reset form
    setTotalAmount('');
    setDescription('');
    setPeople([{ id: 1, name: 'คนที่ 1' }, { id: 2, name: 'คนที่ 2' }]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
      {/* Bill Description */}
      <div className="bg-yellow-50 p-6 rounded-xl">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="คำอธิบายบิล (เช่น ค่าอาหารมื้อเย็น)"
          className="w-full px-4 py-3 rounded-lg border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Bill Amount Input */}
      <div className="bg-blue-50 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Receipt className="text-blue-600" />
          <h2 className="text-xl font-semibold text-blue-900">ยอดรวมทั้งหมด</h2>
        </div>
        <div className="mt-2">
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="ใส่จำนวนเงิน"
            className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* People Management */}
      <div className="bg-purple-50 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <Users className="text-purple-600" />
          <h2 className="text-xl font-semibold text-purple-900">รายชื่อคนหาร</h2>
        </div>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="ใส่ชื่อคนหารบิล"
            className="flex-1 px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={addPerson}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <PlusCircle size={20} />
            เพิ่ม
          </button>
        </div>

        <div className="space-y-2">
          {people.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between bg-white p-3 rounded-lg border border-purple-100"
            >
              <span className="font-medium text-gray-700">{person.name}</span>
              <button
                onClick={() => removePerson(person.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <MinusCircle size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!totalAmount || people.length === 0}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        บันทึกบิล
      </button>
    </div>
  );
}