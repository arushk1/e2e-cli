import { describe, it, expect, vi } from "vitest";
import { registerNodeTools } from "../../src/tools/nodes.js";

describe("registerNodeTools", () => {
  it("registers all node tools", () => {
    const toolNames: string[] = [];
    const mockServer = {
      tool: vi.fn((name: string) => {
        toolNames.push(name);
      }),
    };

    registerNodeTools(mockServer as any, {} as any);

    expect(toolNames).toContain("e2e_node_list");
    expect(toolNames).toContain("e2e_node_get");
    expect(toolNames).toContain("e2e_node_create");
    expect(toolNames).toContain("e2e_node_delete");
    expect(toolNames).toContain("e2e_node_action");
    expect(toolNames).toHaveLength(5);
  });
});
