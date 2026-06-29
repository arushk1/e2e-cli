export interface Vpc {
  network_id: number;
  name: string;
  network_mask: string;
  gateway_ip: string;
  pool_size: number;
  ipv4_cidr: string;
  state: string;
  is_active: boolean;
  created_at: string;
}

export interface CreateVpcParams {
  vpc_name: string;
  ipv4?: string;
  is_e2e_vpc?: boolean;
}
