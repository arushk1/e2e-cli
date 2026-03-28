import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { E2EClient } from "@e2e-cloud/sdk";

export function registerVpcTools(server: McpServer, client: E2EClient): void {
  server.tool("e2e_vpc_list", "List all VPCs", {}, async () => {
    const result = await client.vpcs.list();
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_vpc_get", "Get VPC details", {
    id: z.number().describe("VPC network ID"),
  }, async ({ id }) => {
    const result = await client.vpcs.get(id);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_vpc_create", "Create a new VPC", {
    name: z.string().describe("VPC name"),
    network_size: z.number().optional().default(512).describe("Network size (number of IPs)"),
  }, async ({ name, network_size }) => {
    const result = await client.vpcs.create({ vpc_name: name, network_size });
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_vpc_delete", "Delete a VPC", {
    id: z.number().describe("VPC network ID"),
  }, async ({ id }) => {
    await client.vpcs.delete(id);
    return { content: [{ type: "text", text: `VPC ${id} deleted successfully.` }] };
  });
}
