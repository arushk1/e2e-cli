import { describe, it, expect, vi, beforeEach } from "vitest";
import { ReserveIpService } from "../../src/services/reserve-ips.js";
import type { HttpClient } from "../../src/http.js";

function mockHttp(): HttpClient {
  return { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } as unknown as HttpClient;
}

describe("ReserveIpService", () => {
  let http: HttpClient;
  let rip: ReserveIpService;

  beforeEach(() => { http = mockHttp(); rip = new ReserveIpService(http); });

  it("list() calls GET /reserve_ips/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await rip.list();
    expect(http.get).toHaveBeenCalledWith("/reserve_ips/");
  });

  it("create() calls POST /reserve_ips/", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: { id: 1 } });
    await rip.create();
    expect(http.post).toHaveBeenCalledWith("/reserve_ips/", {});
  });

  it("delete(ipAddress) calls DELETE /reserve_ips/{ipAddress}/actions/", async () => {
    (http.delete as any).mockResolvedValue({ code: 200, data: null });
    await rip.delete("164.52.198.54");
    expect(http.delete).toHaveBeenCalledWith("/reserve_ips/164.52.198.54/actions/");
  });

  it("action(ipAddress, params) calls POST /reserve_ips/{ipAddress}/actions/", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: { status: "Attached" } });
    await rip.action("164.52.198.54", { vm_id: 259555, type: "attach" });
    expect(http.post).toHaveBeenCalledWith("/reserve_ips/164.52.198.54/actions/", {
      vm_id: 259555,
      type: "attach",
    });
  });
});
