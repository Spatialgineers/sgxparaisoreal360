export interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  property: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  stats: string;
  price: number;
  status: string;
  image: string;
  panoUrls: string[];
  views: number;
}

export interface Lead {
  id: string;
  name: string;
  timeAgo: string;
  interest: string;
  source: string;
  status: string;
  initials: string;
}
