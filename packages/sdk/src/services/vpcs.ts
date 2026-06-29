import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type { Vpc, CreateVpcParams } from "../types/vpc.js";

export class VpcService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ApiResponse<Vpc[]>> {
    return this.http.get<Vpc[]>("/vpc/list/");
  }

  async get(id: number): Promise<ApiResponse<Vpc | undefined>> {
    const response = await this.list();
    return {
      ...response,
      data: response.data.find((vpc) => vpc.network_id === id),
    };
  }

  async create(params: CreateVpcParams): Promise<ApiResponse<Vpc>> {
    return this.http.post<Vpc>("/vpc/", {
      vpc_name: params.vpc_name,
      ipv4: params.ipv4,
      is_e2e_vpc: params.is_e2e_vpc,
    });
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<void>(`/vpc/${id}/`);
  }
}
