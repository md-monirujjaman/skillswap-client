export type Role = 'Client' | 'Freelancer' | 'Admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: Role;
  skills: string[];
  bio: string;
  hourlyRate?: number;
  isBlocked: boolean;
  isVerified?: boolean;
  bookmarkedTasks?: string[];
  createdAt: string;
}

export interface Task {
  _id: string;
  title: string;
  category: string;
  description: string;
  budget: number;
  deadline: string;
  client_email: string;
  client_name?: string;
  status: 'Open' | 'In Progress' | 'Completed';
  deliverable_url: string;
  createdAt: string;
}

export interface Proposal {
  _id: string;
  task_id: string;
  freelancer_email: string;
  proposed_budget: number;
  estimated_days: number;
  cover_note: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  submitted_at: string;
}

export interface Payment {
  _id: string;
  client_email: string;
  freelancer_email: string;
  task_id: string;
  amount: number;
  transaction_id: string;
  payment_status: string;
  paid_at: string;
}

export interface Review {
  _id: string;
  task_id: string;
  reviewer_email: string;
  reviewee_email: string;
  rating: number;
  comment: string;
  created_at: string;
}
