import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type { ReserveIp } from "../types/reserve-ip.js";

export class ReserveIpService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ApiResponse<ReserveIp[]>> {
    return this.http.get<ReserveIp[]>("/reserve_ip/");
  }

  async get(id: number): Promise<ApiResponse<ReserveIp>> {
    return this.http.get<ReserveIp>(`/reserve_ip/${id}/`);
  }

  async create(): Promise<ApiResponse<ReserveIp>> {
    return this.http.post<ReserveIp>("/reserve_ip/");
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<void>(`/reserve_ip/${id}/`);
  }
}
