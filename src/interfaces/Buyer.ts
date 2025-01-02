export interface BuyerAttributes {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  created_at?: Date;
  updated_at?: Date;
}
