export interface Firewall {
  id: number;
  vm_id: number;
  name: string;
  public_ip_address: string;
  private_ip_address: string;
  status: string;
  plan: string;
  region: string | null;
  is_fortigate_vm?: boolean;
  created_at: string;
}

export interface CreateFirewallParams {
  label: string;
  name: string;
  region: string;
  plan: string;
  image: string;
  vpc_id: number;
  cn_id: number;
  ssh_keys?: string[];
  start_scripts?: string[];
  backups?: boolean;
  enable_bitninja?: boolean;
  disable_password?: boolean;
  is_saved_image?: boolean;
  saved_image_template_id?: string | null;
  reserve_ip?: string;
  is_ipv6_availed?: boolean;
  default_public_ip?: boolean;
  ngc_container_id?: string | null;
}
