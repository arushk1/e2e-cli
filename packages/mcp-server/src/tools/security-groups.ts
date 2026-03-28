import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { E2EClient } from "@e2e-cloud/sdk";

export function registerSecurityGroupTools(server: McpServer, client: E2EClient): void {
  server.tool("e2e_security_group_list", "List all security groups", {}, async () => {
    const result = await client.securityGroups.list();
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_security_group_get", "Get security group details", {
    id: z.number().describe("Security group ID"),
  }, async ({ id }) => {
    const result = await client.securityGroups.get(id);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });
}
