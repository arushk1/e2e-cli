import { describe, it, expect, vi, beforeEach } from "vitest";
import { DnsService } from "../../src/services/dns.js";
import type { HttpClient } from "../../src/http.js";

function mockHttp(): HttpClient {
  return { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } as unknown as HttpClient;
}

describe("DnsService", () => {
  let http: HttpClient;
  let dns: DnsService;

  beforeEach(() => { http = mockHttp(); dns = new DnsService(http); });

  it("list() calls GET /e2e_dns/forward/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await dns.list();
    expect(http.get).toHaveBeenCalledWith("/e2e_dns/forward/");
  });

  it("get(domainName) calls GET /e2e_dns/forward/{domainName}/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: { domain_name: "example.com." } });
    await dns.get("example.com");
    expect(http.get).toHaveBeenCalledWith("/e2e_dns/forward/example.com/");
  });

  it("create() calls POST /e2e_dns/forward/", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: { id: 1 } });
    await dns.create({ domain_name: "example.com", ip_addr: "1.2.3.4" });
    expect(http.post).toHaveBeenCalledWith("/e2e_dns/forward/", {
      domain_name: "example.com",
      ip_addr: "1.2.3.4",
    });
  });

  it("delete() calls DELETE /e2e_dns/forward/ with domain_id query", async () => {
    (http.delete as any).mockResolvedValue({ code: 200, data: null });
    await dns.delete(10280);
    expect(http.delete).toHaveBeenCalledWith("/e2e_dns/forward/", { domain_id: 10280 });
  });

  it("verifyNameservers() calls the nameserver diagnostics endpoint", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: { status: true } });
    await dns.verifyNameservers("example.com");
    expect(http.get).toHaveBeenCalledWith("/e2e_dns/diagnostics/verify_ns/example.com/");
  });
});
