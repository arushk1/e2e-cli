import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type { Volume, CreateVolumeParams } from "../types/volume.js";

export class VolumeService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ApiResponse<Volume[]>> {
    return this.http.get<Volume[]>("/block_storage/");
  }

  async get(id: number): Promise<ApiResponse<Volume>> {
    return this.http.get<Volume>(`/block_storage/${id}/`);
  }

  async create(params: CreateVolumeParams): Promise<ApiResponse<Volume>> {
    return this.http.post<Volume>("/block_storage/", {
      name: params.name,
      size: params.size,
      iops: params.iops,
    });
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<void>(`/block_storage/${id}/`);
  }

  async attach(volumeId: number, vmId: number): Promise<ApiResponse<void>> {
    return this.http.put<void>(`/block_storage/${volumeId}/vm/attach/`, {
      vm_id: vmId,
    });
  }

  async detach(volumeId: number, vmId: number): Promise<ApiResponse<void>> {
    return this.http.put<void>(`/block_storage/${volumeId}/vm/detach/`, {
      vm_id: vmId,
    });
  }
}
