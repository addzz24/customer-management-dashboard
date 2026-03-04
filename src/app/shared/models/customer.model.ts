export interface Customer {
  id: string;
  name: string;
  email: string;
  mobile: string;
  category: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending';
}
