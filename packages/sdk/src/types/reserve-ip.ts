export interface ReserveIp {
  id: number;
  ip_address: string;
  reserve_id: number;
  status: string;
  reserved_type: string;
  appliance_type: string;
  vm_id?: number;
  vm_name?: string;
  project_name: string;
  bought_at: string;
}

export interface CreateReserveIpParams {}
