import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type { Firewall, CreateFirewallParams } from "../types/firewall.js";

export class FirewallService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ApiResponse<Firewall[]>> {
    return this.http.get<Firewall[]>("/fortigate/list");
  }

  async get(id: number): Promise<ApiResponse<Firewall | undefined>> {
    const response = await this.list();
    return {
      ...response,
      data: response.data.find(
        (firewall) => firewall.id === id || firewall.vm_id === id
      ),
    };
  }

  async create(params: CreateFirewallParams): Promise<ApiResponse<Firewall>> {
    return this.http.post<Firewall>("/fortigate/create", {
      ssh_keys: [],
      start_scripts: [],
      backups: false,
      enable_bitninja: false,
      disable_password: false,
      is_saved_image: false,
      saved_image_template_id: null,
      is_ipv6_availed: false,
      default_public_ip: false,
      ngc_container_id: null,
      ...params,
    });
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<void>(`/nodes/${id}/`);
  }
}
