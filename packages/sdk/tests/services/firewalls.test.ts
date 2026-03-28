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

  it("list() calls GET /firewall/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await fw.list();
    expect(http.get).toHaveBeenCalledWith("/firewall/");
  });

  it("create() calls POST /firewall/", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: { id: 1 } });
    await fw.create({ name: "fw1", rules: [] });
    expect(http.post).toHaveBeenCalledWith("/firewall/", { name: "fw1", rules: [] });
  });

  it("delete(id) calls DELETE /firewall/{id}/", async () => {
    (http.delete as any).mockResolvedValue({ code: 200, data: null });
    await fw.delete(1);
    expect(http.delete).toHaveBeenCalledWith("/firewall/1/");
  });
});
