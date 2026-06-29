import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type {
  FloatingIpParams,
  ReserveIp,
  ReserveIpActionParams,
} from "../types/reserve-ip.js";

export class ReserveIpService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ApiResponse<ReserveIp[]>> {
    return this.http.get<ReserveIp[]>("/reserve_ips/");
  }

  async get(ipAddress: string): Promise<ApiResponse<ReserveIp | undefined>> {
    const response = await this.list();
    return {
      ...response,
      data: response.data.find((reserveIp) => reserveIp.ip_address === ipAddress),
    };
  }

  async create(): Promise<ApiResponse<ReserveIp>> {
    return this.http.post<ReserveIp>("/reserve_ips/", {});
  }

  async delete(ipAddress: string): Promise<ApiResponse<void>> {
    return this.http.delete<void>(`/reserve_ips/${ipAddress}/actions/`);
  }

  async action(
    ipAddress: string,
    params: ReserveIpActionParams
  ): Promise<ApiResponse<ReserveIp>> {
    return this.http.post<ReserveIp>(
      `/reserve_ips/${ipAddress}/actions/`,
      params
    );
  }

  async convertToFloating(
    params: FloatingIpParams
  ): Promise<ApiResponse<{ floating_ip_address: string }>> {
    return this.http.post<{ floating_ip_address: string }>(
      "/reserve_ips/floating-ip/",
      params
    );
  }

  async attachFloating(params: FloatingIpParams): Promise<ApiResponse<void>> {
    return this.http.put<void>("/reserve_ips/floating-ip/attach/", params);
  }

  async detachFloating(params: FloatingIpParams): Promise<ApiResponse<void>> {
    return this.http.put<void>("/reserve_ips/floating-ip/detach/", params);
  }
}
