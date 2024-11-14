export interface Person {
  id: number;
  name: string;
}

export interface Bill {
  id: number;
  totalAmount: number;
  people: Person[];
  date: string;
  description: string;
}