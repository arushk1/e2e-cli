import { describe, it, expect, vi, beforeEach } from "vitest";
import { VpcService } from "../../src/services/vpcs.js";
import type { HttpClient } from "../../src/http.js";

function mockHttp(): HttpClient {
  return { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } as unknown as HttpClient;
}

describe("VpcService", () => {
  let http: HttpClient;
  let vpcs: VpcService;

  beforeEach(() => { http = mockHttp(); vpcs = new VpcService(http); });

  it("list() calls GET /vpc/list/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await vpcs.list();
    expect(http.get).toHaveBeenCalledWith("/vpc/list/");
  });

  it("create() calls POST /vpc/", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: { network_id: 1 } });
    await vpcs.create({ vpc_name: "my-vpc", network_size: 512 });
    expect(http.post).toHaveBeenCalledWith("/vpc/", { vpc_name: "my-vpc", network_size: 512 });
  });

  it("delete(id) calls DELETE /vpc/{id}/", async () => {
    (http.delete as any).mockResolvedValue({ code: 200, data: null });
    await vpcs.delete(1);
    expect(http.delete).toHaveBeenCalledWith("/vpc/1/");
  });
});
