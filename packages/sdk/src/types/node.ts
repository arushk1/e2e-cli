export interface Node {
  id: number;
  name: string;
  plan: string;
  status: string;
  created_at: string;
  disk: number;
  public_ip_address: string;
  private_ip_address: string;
  memory: number;
  price: number;
  is_active: boolean;
}

export interface CreateNodeParams {
  name: string;
  region: string;
  plan: string;
  image: string;
  security_group_id: number;
  ssh_keys?: string[];
  backups?: boolean;
  enable_bitninja?: boolean;
  disable_password?: boolean;
  is_ipv6_availed?: boolean;
  vpc_id?: number | null;
  default_public_ip?: boolean;
  reserve_ip?: string;
}

export type NodeActionType =
  | "power_on"
  | "power_off"
  | "reboot"
  | "reinstall"
  | "lock_vm"
  | "unlock_vm"
  | "enable_recovery_mode"
  | "disable_recovery_mode"
  | "rename";

export interface NodeAction {
  type: NodeActionType;
  name?: string;
}

export interface NodeActionResponse {
  action_type: string;
  status: string;
  id: number;
}
