export interface FirewallRule {
  id: number;
  protocol: string;
  port_range: string;
  source: string;
  direction: string;
  action: string;
}

export interface Firewall {
  id: number;
  name: string;
  rules: FirewallRule[];
  created_at: string;
}

export interface CreateFirewallParams {
  name: string;
  rules: Omit<FirewallRule, "id">[];
}
