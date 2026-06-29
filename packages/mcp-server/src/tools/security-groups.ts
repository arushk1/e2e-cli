import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { E2EClient } from "@e2e-cloud/sdk";

const securityGroupRuleSchema = z.object({
  id: z.number().optional().describe("Existing rule ID for updates"),
  network: z.string().describe("Network value, for example any"),
  rule_type: z.enum(["Inbound", "Outbound"]).describe("Rule direction"),
  protocol_name: z.string().describe("Protocol name, for example Custom_TCP"),
  port_range: z.string().describe("Port range, for example 80,443"),
  network_cidr: z.string().describe("Network CIDR or --"),
  network_size: z.number().describe("Network size"),
  vpc_id: z.union([z.number(), z.string()]).nullable().describe("VPC ID or null"),
});

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

  server.tool("e2e_security_group_create", "Create a security group", {
    name: z.string().describe("Security group name"),
    description: z.string().optional().default("").describe("Description"),
    rules: z.array(securityGroupRuleSchema).optional().default([]).describe("Security group rules"),
    default: z.boolean().optional().default(false).describe("Make this the default security group"),
  }, async (params) => {
    const result = await client.securityGroups.create(params);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_security_group_update", "Update a security group", {
    id: z.number().describe("Security group ID"),
    name: z.string().optional().describe("Security group name"),
    description: z.string().optional().describe("Description"),
    rules: z.array(securityGroupRuleSchema).optional().describe("Security group rules"),
  }, async ({ id, ...params }) => {
    const result = await client.securityGroups.update(id, params);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_security_group_delete", "Delete a security group", {
    id: z.number().describe("Security group ID"),
  }, async ({ id }) => {
    await client.securityGroups.delete(id);
    return { content: [{ type: "text", text: `Security group ${id} deleted successfully.` }] };
  });

  server.tool("e2e_security_group_mark_default", "Mark a security group as the default", {
    id: z.number().describe("Security group ID"),
  }, async ({ id }) => {
    await client.securityGroups.markDefault(id);
    return { content: [{ type: "text", text: `Security group ${id} marked as default.` }] };
  });
}
