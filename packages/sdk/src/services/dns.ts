import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type {
  CreateDnsDomainParams,
  DnsCreateResponse,
  DnsDeleteResponse,
  DnsDiagnosticResponse,
  DnsDomain,
  DnsDomainDetails,
} from "../types/dns.js";

export class DnsService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ApiResponse<DnsDomain[]>> {
    return this.http.get<DnsDomain[]>("/e2e_dns/forward/");
  }

  async get(domainName: string): Promise<ApiResponse<DnsDomainDetails>> {
    return this.http.get<DnsDomainDetails>(
      `/e2e_dns/forward/${domainName}/`
    );
  }

  async create(
    params: CreateDnsDomainParams
  ): Promise<ApiResponse<DnsCreateResponse>> {
    return this.http.post<DnsCreateResponse>("/e2e_dns/forward/", params);
  }

  async delete(
    domainId: number | string
  ): Promise<ApiResponse<DnsDeleteResponse>> {
    return this.http.delete<DnsDeleteResponse>("/e2e_dns/forward/", {
      domain_id: domainId,
    });
  }

  async verifyNameservers(
    domainName: string
  ): Promise<ApiResponse<DnsDiagnosticResponse>> {
    return this.http.get<DnsDiagnosticResponse>(
      `/e2e_dns/diagnostics/verify_ns/${domainName}/`
    );
  }

  async verifyValidity(
    domainName: string
  ): Promise<ApiResponse<DnsDiagnosticResponse>> {
    return this.http.get<DnsDiagnosticResponse>(
      `/e2e_dns/diagnostics/verify_validity/${domainName}/`
    );
  }

  async verifyTtl(
    domainName: string
  ): Promise<ApiResponse<DnsDiagnosticResponse>> {
    return this.http.get<DnsDiagnosticResponse>(
      `/e2e_dns/diagnostics/verify_ttl/${domainName}/`
    );
  }
}
