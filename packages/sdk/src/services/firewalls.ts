import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type { Firewall, CreateFirewallParams } from "../types/firewall.js";

export class FirewallService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ApiResponse<Firewall[]>> {
    return this.http.get<Firewall[]>("/firewall/");
  }

  async get(id: number): Promise<ApiResponse<Firewall>> {
    return this.http.get<Firewall>(`/firewall/${id}/`);
  }

  async create(params: CreateFirewallParams): Promise<ApiResponse<Firewall>> {
    return this.http.post<Firewall>("/firewall/", params);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<void>(`/firewall/${id}/`);
  }
}
