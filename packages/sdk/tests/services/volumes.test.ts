import { describe, it, expect, vi, beforeEach } from "vitest";
import { VolumeService } from "../../src/services/volumes.js";
import type { HttpClient } from "../../src/http.js";

function mockHttp(): HttpClient {
  return { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } as unknown as HttpClient;
}

describe("VolumeService", () => {
  let http: HttpClient;
  let volumes: VolumeService;

  beforeEach(() => {
    http = mockHttp();
    volumes = new VolumeService(http);
  });

  it("list() calls GET /block_storage/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await volumes.list();
    expect(http.get).toHaveBeenCalledWith("/block_storage/");
  });

  it("create() sends stringified size/iops", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: { block_id: 1 } });
    await volumes.create({ name: "vol", size: 250, iops: 5000 });
    expect(http.post).toHaveBeenCalledWith("/block_storage/", {
      name: "vol", size: "250", iops: "5000",
    });
  });

  it("delete(id) calls DELETE /block_storage/{id}/", async () => {
    (http.delete as any).mockResolvedValue({ code: 200, data: null });
    await volumes.delete(10);
    expect(http.delete).toHaveBeenCalledWith("/block_storage/10/");
  });

  it("attach() calls POST with vm_id", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: null });
    await volumes.attach(10, 20);
    expect(http.post).toHaveBeenCalledWith("/block_storage/10/vm/attach/", { vm_id: "20" });
  });

  it("detach() calls POST with vm_id", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: null });
    await volumes.detach(10, 20);
    expect(http.post).toHaveBeenCalledWith("/block_storage/10/vm/detach/", { vm_id: "20" });
  });
});
