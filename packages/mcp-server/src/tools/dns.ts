import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { E2EClient } from "@e2e-cloud/sdk";

export function registerDnsTools(server: McpServer, client: E2EClient): void {
  server.tool("e2e_dns_list", "List DNS forwarding domains", {}, async () => {
    const result = await client.dns.list();
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_dns_get", "Get DNS domain details", {
    domain_name: z.string().describe("Domain name"),
  }, async ({ domain_name }) => {
    const result = await client.dns.get(domain_name);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_dns_create", "Create a DNS forwarding domain", {
    domain_name: z.string().describe("Domain name"),
    ip_addr: z.string().describe("IPv4 address"),
  }, async (params) => {
    const result = await client.dns.create(params);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_dns_delete", "Delete a DNS forwarding domain", {
    domain_id: z.union([z.number(), z.string()]).describe("Domain ID"),
  }, async ({ domain_id }) => {
    await client.dns.delete(domain_id);
    return { content: [{ type: "text", text: `DNS domain ${domain_id} deleted successfully.` }] };
  });

  server.tool("e2e_dns_verify_nameservers", "Verify nameservers for a DNS domain", {
    domain_name: z.string().describe("Domain name"),
  }, async ({ domain_name }) => {
    const result = await client.dns.verifyNameservers(domain_name);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_dns_verify_validity", "Diagnose DNS domain validity", {
    domain_name: z.string().describe("Domain name"),
  }, async ({ domain_name }) => {
    const result = await client.dns.verifyValidity(domain_name);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_dns_verify_ttl", "Diagnose DNS TTL", {
    domain_name: z.string().describe("Domain name"),
  }, async ({ domain_name }) => {
    const result = await client.dns.verifyTtl(domain_name);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });
}
