export interface DnsDomain {
  id: number;
  domain_name: string;
  domain_ip: string;
  validity: string | null;
  created_at: string;
  deleted: boolean;
}

export interface DnsDomainDetails {
  domain_name: string;
  domain: Record<string, unknown>;
  domain_ip: string;
  DOMAIN_TTL: number;
}

export interface CreateDnsDomainParams {
  domain_name: string;
  ip_addr: string;
}

export interface DnsCreateResponse {
  status: boolean;
  message: string;
  id: number;
  label_id: number | null;
  resource_type: string | null;
}

export interface DnsDeleteResponse {
  status: boolean;
  message: string;
}

export interface DnsDiagnosticResponse {
  status: boolean;
  message: string;
  data?: unknown;
}
