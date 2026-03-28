import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { E2EClient } from "@e2e-cloud/sdk";

export function registerDnsTools(server: McpServer, client: E2EClient): void {
  server.tool("e2e_dns_list_zones", "List all DNS zones", {}, async () => {
    const result = await client.dns.listZones();
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_dns_get_zone", "Get DNS zone details", {
    id: z.number().describe("Zone ID"),
  }, async ({ id }) => {
    const result = await client.dns.getZone(id);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_dns_list_records", "List DNS records for a zone", {
    zone_id: z.number().describe("Zone ID"),
  }, async ({ zone_id }) => {
    const result = await client.dns.listRecords(zone_id);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_dns_create_record", "Create a DNS record", {
    zone_id: z.number().describe("Zone ID"),
    type: z.string().describe("Record type (A, AAAA, CNAME, MX, TXT)"),
    name: z.string().describe("Record name"),
    content: z.string().describe("Record value"),
    ttl: z.number().optional().default(3600).describe("TTL in seconds"),
    priority: z.number().optional().describe("Priority (for MX records)"),
  }, async (params) => {
    const result = await client.dns.createRecord(params);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_dns_delete_record", "Delete a DNS record", {
    zone_id: z.number().describe("Zone ID"),
    record_id: z.number().describe("Record ID"),
  }, async ({ zone_id, record_id }) => {
    await client.dns.deleteRecord(zone_id, record_id);
    return { content: [{ type: "text", text: `DNS record ${record_id} deleted successfully.` }] };
  });
}
