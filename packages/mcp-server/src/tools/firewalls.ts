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

  server.tool("e2e_firewall_create", "Create a new firewall", {
    name: z.string().describe("Firewall name"),
    rules: z.array(z.object({
      protocol: z.string().describe("Protocol (tcp, udp, icmp)"),
      port_range: z.string().describe("Port range (e.g., 80, 443, 8000-9000)"),
      source: z.string().describe("Source CIDR (e.g., 0.0.0.0/0)"),
      direction: z.string().describe("Direction (inbound, outbound)"),
      action: z.string().describe("Action (allow, deny)"),
    })).optional().default([]).describe("Firewall rules"),
  }, async ({ name, rules }) => {
    const result = await client.firewalls.create({ name, rules });
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_firewall_delete", "Delete a firewall", {
    id: z.number().describe("Firewall ID"),
  }, async ({ id }) => {
    await client.firewalls.delete(id);
    return { content: [{ type: "text", text: `Firewall ${id} deleted successfully.` }] };
  });
}
