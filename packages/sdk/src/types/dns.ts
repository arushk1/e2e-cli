export interface DnsZone {
  id: number;
  domain: string;
  status: string;
  created_at: string;
}

export interface DnsRecord {
  id: number;
  type: string;
  name: string;
  content: string;
  ttl: number;
  priority?: number;
}

export interface CreateDnsRecordParams {
  zone_id: number;
  type: string;
  name: string;
  content: string;
  ttl?: number;
  priority?: number;
}
