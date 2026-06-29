import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { E2EClient } from "@e2e-cloud/sdk";

export function registerFirewallTools(server: McpServer, client: E2EClient): void {
  server.tool("e2e_firewall_list", "List all firewalls", {}, async () => {
    const result = await client.firewalls.list();
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_firewall_get", "Get firewall details", {
    id: z.number().describe("Firewall ID"),
  }, async ({ id }) => {
    const result = await client.firewalls.get(id);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_firewall_create", "Create a new Fortigate firewall", {
    label: z.string().optional().default("Default").describe("Resource label"),
    name: z.string().describe("Firewall name"),
    region: z.string().optional().default("ncr").describe("Region code"),
    plan: z.string().describe("Fortigate plan identifier"),
    image: z.string().describe("Fortigate image identifier"),
    vpc_id: z.number().describe("VPC ID"),
    cn_id: z.number().describe("Committed node SKU ID"),
    reserve_ip: z.string().optional().describe("Reserved IP to assign"),
  }, async (params) => {
    const result = await client.firewalls.create(params);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_firewall_delete", "Delete a firewall", {
    id: z.number().describe("Firewall ID"),
  }, async ({ id }) => {
    await client.firewalls.delete(id);
    return { content: [{ type: "text", text: `Firewall ${id} deleted successfully.` }] };
  });
}
