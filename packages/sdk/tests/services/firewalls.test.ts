import { describe, it, expect, vi, beforeEach } from "vitest";
import { FirewallService } from "../../src/services/firewalls.js";
import type { HttpClient } from "../../src/http.js";

function mockHttp(): HttpClient {
  return { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } as unknown as HttpClient;
}

describe("FirewallService", () => {
  let http: HttpClient;
  let fw: FirewallService;

  beforeEach(() => { http = mockHttp(); fw = new FirewallService(http); });

  it("list() calls GET /fortigate/list", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await fw.list();
    expect(http.get).toHaveBeenCalledWith("/fortigate/list");
  });

  it("create() calls POST /fortigate/create with documented fields", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: { id: 1 } });
    await fw.create({
      label: "Default",
      name: "Fortinet-7-01-Fortinet-835",
      region: "ncr",
      plan: "FTN-1vCPU-9RAM-20DISK-FTN.200V-Delhi",
      image: "Fortinet-7.01-Fortinet",
      vpc_id: 16791,
      cn_id: 3033,
    });
    expect(http.post).toHaveBeenCalledWith(
      "/fortigate/create",
      expect.objectContaining({
        name: "Fortinet-7-01-Fortinet-835",
        vpc_id: 16791,
        cn_id: 3033,
      })
    );
  });

  it("delete(id) calls DELETE /nodes/{firewallId}/", async () => {
    (http.delete as any).mockResolvedValue({ code: 200, data: null });
    await fw.delete(1);
    expect(http.delete).toHaveBeenCalledWith("/nodes/1/");
  });
});
