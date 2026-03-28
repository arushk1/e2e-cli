import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { E2EClient } from "@e2e-cloud/sdk";

export function registerNodeTools(
  server: McpServer,
  client: E2EClient
): void {
  server.tool(
    "e2e_node_list",
    "List all compute nodes in E2E Cloud",
    {},
    async () => {
      const result = await client.nodes.list();
      return {
        content: [
          { type: "text", text: JSON.stringify(result.data, null, 2) },
        ],
      };
    }
  );

  server.tool(
    "e2e_node_get",
    "Get details of a specific compute node",
    { id: z.number().describe("Node ID") },
    async ({ id }) => {
      const result = await client.nodes.get(id);
      return {
        content: [
          { type: "text", text: JSON.stringify(result.data, null, 2) },
        ],
      };
    }
  );

  server.tool(
    "e2e_node_create",
    "Create a new compute node",
    {
      name: z.string().describe("Node name"),
      plan: z.string().describe("Plan identifier (e.g., C-2)"),
      image: z.string().describe("Image name (e.g., Ubuntu-22.04-Starter)"),
      security_group_id: z.number().describe("Security group ID"),
      region: z
        .string()
        .optional()
        .default("ncr")
        .describe("Region (ncr, mumbai)"),
      ssh_keys: z.array(z.string()).optional().describe("SSH key names"),
      backups: z
        .boolean()
        .optional()
        .default(false)
        .describe("Enable backups"),
      vpc_id: z.number().optional().describe("VPC ID"),
    },
    async (params) => {
      const result = await client.nodes.create(params);
      return {
        content: [
          { type: "text", text: JSON.stringify(result.data, null, 2) },
        ],
      };
    }
  );

  server.tool(
    "e2e_node_delete",
    "Delete a compute node",
    { id: z.number().describe("Node ID") },
    async ({ id }) => {
      await client.nodes.delete(id);
      return {
        content: [{ type: "text", text: `Node ${id} deleted successfully.` }],
      };
    }
  );

  server.tool(
    "e2e_node_action",
    "Perform an action on a node (power_on, power_off, reboot, reinstall, lock_vm, unlock_vm, rename)",
    {
      id: z.number().describe("Node ID"),
      type: z
        .enum([
          "power_on",
          "power_off",
          "reboot",
          "reinstall",
          "lock_vm",
          "unlock_vm",
          "enable_recovery_mode",
          "disable_recovery_mode",
          "rename",
        ])
        .describe("Action type"),
      name: z
        .string()
        .optional()
        .describe("New name (only for rename action)"),
    },
    async ({ id, type, name }) => {
      const action: { type: string; name?: string } = { type };
      if (name) action.name = name;
      const result = await client.nodes.action(id, action as any);
      return {
        content: [
          { type: "text", text: JSON.stringify(result.data, null, 2) },
        ],
      };
    }
  );
}
