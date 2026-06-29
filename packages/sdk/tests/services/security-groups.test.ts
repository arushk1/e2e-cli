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

  it("create() calls POST /security_group/", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: {} });
    await sg.create({
      name: "web",
      description: "",
      rules: [
        {
          network: "any",
          rule_type: "Inbound",
          protocol_name: "Custom_TCP",
          port_range: "80,443",
          network_cidr: "--",
          network_size: 1,
          vpc_id: null,
        },
      ],
      default: false,
    });
    expect(http.post).toHaveBeenCalledWith("/security_group/", {
      name: "web",
      description: "",
      rules: [
        {
          network: "any",
          rule_type: "Inbound",
          protocol_name: "Custom_TCP",
          port_range: "80,443",
          network_cidr: "--",
          network_size: 1,
          vpc_id: null,
        },
      ],
      default: false,
    });
  });

  it("update() calls PUT /security_group/{id}/", async () => {
    (http.put as any).mockResolvedValue({ code: 200, data: "" });
    await sg.update(1, { name: "web-updated" });
    expect(http.put).toHaveBeenCalledWith("/security_group/1/", { name: "web-updated" });
  });

  it("delete() calls DELETE /security_group/{id}/", async () => {
    (http.delete as any).mockResolvedValue({ code: 200, data: {} });
    await sg.delete(1);
    expect(http.delete).toHaveBeenCalledWith("/security_group/1/");
  });

  it("markDefault() calls POST /security_group/{id}/mark-default/", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: "" });
    await sg.markDefault(1);
    expect(http.post).toHaveBeenCalledWith("/security_group/1/mark-default/");
  });
});
