import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { E2EClient } from "@e2e-cloud/sdk";

export function registerReserveIpTools(server: McpServer, client: E2EClient): void {
  server.tool("e2e_reserve_ip_list", "List all reserved IP addresses", {}, async () => {
    const result = await client.reserveIps.list();
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_reserve_ip_get", "Get reserved IP details", {
    id: z.number().describe("Reserve IP ID"),
  }, async ({ id }) => {
    const result = await client.reserveIps.get(id);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_reserve_ip_create", "Reserve a new IP address", {}, async () => {
    const result = await client.reserveIps.create();
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_reserve_ip_delete", "Release a reserved IP address", {
    id: z.number().describe("Reserve IP ID"),
  }, async ({ id }) => {
    await client.reserveIps.delete(id);
    return { content: [{ type: "text", text: `Reserved IP ${id} released successfully.` }] };
  });
}
