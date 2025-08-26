export interface Tool {
  id: number;
  name: string;
  description: string;
  vendor: string;
  category: string;
  monthly_cost: number;
  previous_month_cost: number;
  owner_department: string;
  status: string;
  website_url: string;
  active_users_count: number;
  icon_url: string;
  created_at: string;
  updated_at: string;
}
