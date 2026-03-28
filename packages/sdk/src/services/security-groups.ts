import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type { SecurityGroup } from "../types/security-group.js";

export class SecurityGroupService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ApiResponse<SecurityGroup[]>> {
    return this.http.get<SecurityGroup[]>("/security_group/");
  }

  async get(id: number): Promise<ApiResponse<SecurityGroup>> {
    return this.http.get<SecurityGroup>(`/security_group/${id}/`);
  }
}
