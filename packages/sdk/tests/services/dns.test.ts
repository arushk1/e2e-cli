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

  it("listZones() calls GET /dns/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await dns.listZones();
    expect(http.get).toHaveBeenCalledWith("/dns/");
  });

  it("listRecords(zoneId) calls GET /dns/{zoneId}/records/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await dns.listRecords(5);
    expect(http.get).toHaveBeenCalledWith("/dns/5/records/");
  });

  it("createRecord() calls POST /dns/{zoneId}/records/", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: { id: 1 } });
    await dns.createRecord({ zone_id: 5, type: "A", name: "www", content: "1.2.3.4" });
    expect(http.post).toHaveBeenCalledWith("/dns/5/records/", { type: "A", name: "www", content: "1.2.3.4" });
  });

  it("deleteRecord() calls DELETE /dns/{zoneId}/records/{recordId}/", async () => {
    (http.delete as any).mockResolvedValue({ code: 200, data: null });
    await dns.deleteRecord(5, 10);
    expect(http.delete).toHaveBeenCalledWith("/dns/5/records/10/");
  });
});
