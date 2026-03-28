import { describe, it, expect, vi, beforeEach } from "vitest";
import { SecurityGroupService } from "../../src/services/security-groups.js";
import type { HttpClient } from "../../src/http.js";

function mockHttp(): HttpClient {
  return { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } as unknown as HttpClient;
}

describe("SecurityGroupService", () => {
  let http: HttpClient;
  let sg: SecurityGroupService;

  beforeEach(() => { http = mockHttp(); sg = new SecurityGroupService(http); });

  it("list() calls GET /security_group/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await sg.list();
    expect(http.get).toHaveBeenCalledWith("/security_group/");
  });

  it("get(id) calls GET /security_group/{id}/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: { id: 1 } });
    await sg.get(1);
    expect(http.get).toHaveBeenCalledWith("/security_group/1/");
  });
});
