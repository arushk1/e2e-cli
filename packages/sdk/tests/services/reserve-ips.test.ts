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

  it("list() calls GET /reserve_ip/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await rip.list();
    expect(http.get).toHaveBeenCalledWith("/reserve_ip/");
  });

  it("create() calls POST /reserve_ip/", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: { id: 1 } });
    await rip.create();
    expect(http.post).toHaveBeenCalledWith("/reserve_ip/");
  });

  it("delete(id) calls DELETE /reserve_ip/{id}/", async () => {
    (http.delete as any).mockResolvedValue({ code: 200, data: null });
    await rip.delete(1);
    expect(http.delete).toHaveBeenCalledWith("/reserve_ip/1/");
  });
});
