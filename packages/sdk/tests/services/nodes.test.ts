import { describe, it, expect, vi, beforeEach } from "vitest";
import { NodeService } from "../../src/services/nodes.js";
import type { HttpClient } from "../../src/http.js";

function mockHttp(): HttpClient {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  } as unknown as HttpClient;
}

describe("NodeService", () => {
  let http: HttpClient;
  let nodes: NodeService;

  beforeEach(() => {
    http = mockHttp();
    nodes = new NodeService(http);
  });

  it("list() calls GET /nodes/", async () => {
    const response = { code: 200, message: "success", errors: [], data: [{ id: 1 }] };
    (http.get as any).mockResolvedValue(response);
    const result = await nodes.list();
    expect(http.get).toHaveBeenCalledWith("/nodes/");
    expect(result.data).toEqual([{ id: 1 }]);
  });

  it("get(id) calls GET /nodes/{id}/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: { id: 42 } });
    const result = await nodes.get(42);
    expect(http.get).toHaveBeenCalledWith("/nodes/42/");
    expect(result.data.id).toBe(42);
  });

  it("create(params) calls POST /nodes/ with body", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: { id: 99 } });
    await nodes.create({
      name: "new-node",
      region: "ncr",
      plan: "C-2",
      image: "Ubuntu-22.04-Starter",
      security_group_id: 100,
    });
    expect(http.post).toHaveBeenCalledWith(
      "/nodes/",
      expect.objectContaining({ name: "new-node", plan: "C-2" })
    );
  });

  it("delete(id) calls DELETE /nodes/{id}/", async () => {
    (http.delete as any).mockResolvedValue({ code: 200, data: null });
    await nodes.delete(42);
    expect(http.delete).toHaveBeenCalledWith("/nodes/42/");
  });

  it("action(id, action) calls POST /nodes/{id}/actions/", async () => {
    (http.post as any).mockResolvedValue({ code: 200, data: { action_type: "power_off" } });
    const result = await nodes.action(42, { type: "power_off" });
    expect(http.post).toHaveBeenCalledWith("/nodes/42/actions/", { type: "power_off" });
    expect(result.data.action_type).toBe("power_off");
  });
});
