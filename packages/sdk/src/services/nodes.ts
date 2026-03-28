import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type {
  Node,
  CreateNodeParams,
  NodeAction,
  NodeActionResponse,
} from "../types/node.js";

export class NodeService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ApiResponse<Node[]>> {
    return this.http.get<Node[]>("/nodes/");
  }

  async get(id: number): Promise<ApiResponse<Node>> {
    return this.http.get<Node>(`/nodes/${id}/`);
  }

  async create(params: CreateNodeParams): Promise<ApiResponse<Node>> {
    const body = {
      name: params.name,
      region: params.region,
      plan: params.plan,
      image: params.image,
      security_group_id: params.security_group_id,
      ssh_keys: params.ssh_keys ?? [],
      start_scripts: [],
      backups: params.backups ?? false,
      enable_bitninja: params.enable_bitninja ?? false,
      disable_password: params.disable_password ?? false,
      is_saved_image: false,
      saved_image_template_id: null,
      is_ipv6_availed: params.is_ipv6_availed ?? false,
      vpc_id: params.vpc_id ?? null,
      default_public_ip: params.default_public_ip ?? true,
      ngc_container_id: null,
      reserve_ip: params.reserve_ip ?? "",
      reserve_ip_pool: "",
    };
    return this.http.post<Node>("/nodes/", body);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<void>(`/nodes/${id}/`);
  }

  async action(
    id: number,
    action: NodeAction
  ): Promise<ApiResponse<NodeActionResponse>> {
    return this.http.post<NodeActionResponse>(
      `/nodes/${id}/actions/`,
      action
    );
  }
}
