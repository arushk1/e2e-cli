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
  label?: string;
  name: string;
  region: string;
  plan: string;
  image: string;
  image_id?: number;
  is_saved_image?: boolean;
  saved_image_template_id?: number | null;
  ssh_keys: string[];
  start_scripts?: string[];
  disable_password?: boolean;
  disk?: number;
  backups?: boolean;
  is_encryption_required?: boolean;
  isEncryptionEnabled?: boolean;
  encryption_passphrase?: string;
  enable_bitninja?: boolean;
  security_group_id?: number;
  vpc_id?: number;
  subnet_id?: string;
  default_public_ip?: boolean;
  reserve_ip?: string;
  is_ipv6_availed?: boolean;
  is_private?: boolean;
  ngc_container_id?: number | null;
  number_of_instances?: number;
}

export interface CreateNodeResponse {
  total_number_of_node_requested: number;
  total_number_of_node_created: number;
  node_create_response: Node[];
}

export type NodeActionType =
  | "power_on"
  | "power_off"
  | "reboot"
  | "reinstall"
  | "save_images"
  | "lock_vm"
  | "unlock_vm"
  | "enable_recovery_mode"
  | "disable_recovery_mode"
  | "rename"
  | "enable_accidental_protection"
  | "disable_accidental_protection"
  | "enable_node_compliance"
  | "disable_node_compliance";

export interface NodeAction {
  type: NodeActionType;
  name?: string;
}

export interface NodeActionResponse {
  action_type: string;
  status: string;
  id: number;
}
