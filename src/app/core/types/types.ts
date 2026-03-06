export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

export type TableFilterConfig = {
  key: string;
  label: string;
  type: 'select' | 'date' | 'text';
  options?: string[];
}

export type TableFilters  = {
  search?: string;
  status?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}

export type LineChartData = {
  date: string;
  amount: number;
};

export type PieChartData = {
  status: string;
  amount: number;
};

export type BarChartData = {
  category: string,
  amount: number
}


