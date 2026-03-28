export interface Volume {
  block_id: number;
  name: string;
  status: string;
  iops: number;
  size: number;
  vm_id?: number;
  vm_name?: string;
}

export interface CreateVolumeParams {
  name: string;
  size: number;
  iops: number;
}
