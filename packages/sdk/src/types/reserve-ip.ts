export interface ReserveIp {
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

export type ReserveIpActionType = "attach" | "detach" | "live-reserve";

export interface ReserveIpActionParams {
  vm_id: number;
  type: ReserveIpActionType;
}

export interface FloatingIpParams {
  ip_address: string;
  node_ids: number[];
}
