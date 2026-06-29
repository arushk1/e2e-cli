import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type {
  Node,
  CreateNodeParams,
  CreateNodeResponse,
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

  async create(
    params: CreateNodeParams
  ): Promise<ApiResponse<CreateNodeResponse>> {
    const body = {
      label: params.label ?? "default",
      name: params.name,
      region: params.region,
      plan: params.plan,
      image: params.image,
      image_id: params.image_id,
      is_saved_image: params.is_saved_image ?? false,
      saved_image_template_id: params.saved_image_template_id ?? null,
      ssh_keys: params.ssh_keys,
      start_scripts: params.start_scripts ?? [],
      disable_password: params.disable_password ?? true,
      disk: params.disk,
      backups: params.backups ?? false,
      is_encryption_required: params.is_encryption_required ?? false,
      isEncryptionEnabled: params.isEncryptionEnabled ?? false,
      encryption_passphrase: params.encryption_passphrase,
      enable_bitninja: params.enable_bitninja ?? false,
      security_group_id: params.security_group_id,
      vpc_id: params.vpc_id,
      subnet_id: params.subnet_id,
      default_public_ip: params.default_public_ip ?? false,
      reserve_ip: params.reserve_ip ?? "",
      is_ipv6_availed: params.is_ipv6_availed ?? false,
      is_private: params.is_private ?? false,
      ngc_container_id: params.ngc_container_id ?? null,
      number_of_instances: params.number_of_instances ?? 1,
    };
    return this.http.post<CreateNodeResponse>("/nodes/", body);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<void>(`/nodes/${id}/`);
  }

  async action(
    id: number,
    action: NodeAction
  ): Promise<ApiResponse<NodeActionResponse>> {
    return this.http.put<NodeActionResponse>(
      `/nodes/${id}/actions/`,
      action
    );
  }
}
