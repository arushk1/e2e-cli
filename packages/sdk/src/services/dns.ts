import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type {
  DnsZone,
  DnsRecord,
  CreateDnsRecordParams,
} from "../types/dns.js";

export class DnsService {
  constructor(private readonly http: HttpClient) {}

  async listZones(): Promise<ApiResponse<DnsZone[]>> {
    return this.http.get<DnsZone[]>("/dns/");
  }

  async getZone(id: number): Promise<ApiResponse<DnsZone>> {
    return this.http.get<DnsZone>(`/dns/${id}/`);
  }

  async listRecords(zoneId: number): Promise<ApiResponse<DnsRecord[]>> {
    return this.http.get<DnsRecord[]>(`/dns/${zoneId}/records/`);
  }

  async createRecord(
    params: CreateDnsRecordParams
  ): Promise<ApiResponse<DnsRecord>> {
    const { zone_id, ...body } = params;
    return this.http.post<DnsRecord>(`/dns/${zone_id}/records/`, body);
  }

  async deleteRecord(
    zoneId: number,
    recordId: number
  ): Promise<ApiResponse<void>> {
    return this.http.delete<void>(`/dns/${zoneId}/records/${recordId}/`);
  }
}
