import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type {
  CreateSecurityGroupParams,
  SecurityGroup,
  UpdateSecurityGroupParams,
} from "../types/security-group.js";

export class SecurityGroupService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ApiResponse<SecurityGroup[]>> {
    return this.http.get<SecurityGroup[]>("/security_group/");
  }

  async get(id: number): Promise<ApiResponse<SecurityGroup>> {
    return this.http.get<SecurityGroup>(`/security_group/${id}/`);
  }

  async create(
    params: CreateSecurityGroupParams
  ): Promise<ApiResponse<SecurityGroup>> {
    return this.http.post<SecurityGroup>("/security_group/", params);
  }

  async update(
    id: number,
    params: UpdateSecurityGroupParams
  ): Promise<ApiResponse<string>> {
    return this.http.put<string>(`/security_group/${id}/`, params);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<void>(`/security_group/${id}/`);
  }

  async markDefault(id: number): Promise<ApiResponse<string>> {
    return this.http.post<string>(`/security_group/${id}/mark-default/`);
  }
}
