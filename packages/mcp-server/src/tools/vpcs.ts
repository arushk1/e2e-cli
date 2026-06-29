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
    ipv4: z.string().optional().describe("IPv4 CIDR, required when is_e2e_vpc is false"),
    is_e2e_vpc: z.boolean().optional().default(false).describe("Let E2E assign the VPC CIDR automatically"),
  }, async ({ name, ipv4, is_e2e_vpc }) => {
    const result = await client.vpcs.create({ vpc_name: name, ipv4, is_e2e_vpc });
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_vpc_delete", "Delete a VPC", {
    id: z.number().describe("VPC network ID"),
  }, async ({ id }) => {
    await client.vpcs.delete(id);
    return { content: [{ type: "text", text: `VPC ${id} deleted successfully.` }] };
  });
}
