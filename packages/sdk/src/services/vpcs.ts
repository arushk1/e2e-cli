import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type { Vpc, CreateVpcParams } from "../types/vpc.js";

export class VpcService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ApiResponse<Vpc[]>> {
    return this.http.get<Vpc[]>("/vpc/list/");
  }

  async get(id: number): Promise<ApiResponse<Vpc>> {
    return this.http.get<Vpc>(`/vpc/${id}/`);
  }

  async create(params: CreateVpcParams): Promise<ApiResponse<Vpc>> {
    return this.http.post<Vpc>("/vpc/", {
      vpc_name: params.vpc_name,
      network_size: params.network_size,
    });
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<void>(`/vpc/${id}/`);
  }
}
