export interface SecurityGroup {
  id: number;
  name: string;
  description: string;
  rules?: SecurityGroupRule[];
  is_default?: boolean;
  is_all_traffic_rule?: boolean;
}

export interface SecurityGroupRule {
  id?: number;
  network: string;
  rule_type: "Inbound" | "Outbound";
  protocol_name: string;
  port_range: string;
  network_cidr: string;
  network_size: number;
  vpc_id: number | string | null;
}

export interface CreateSecurityGroupParams {
  name: string;
  description?: string;
  rules?: SecurityGroupRule[];
  default?: boolean;
}

export interface UpdateSecurityGroupParams {
  name?: string;
  description?: string;
  rules?: SecurityGroupRule[];
}
