import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { E2EClient } from "@e2e-cloud/sdk";

export function registerReserveIpTools(server: McpServer, client: E2EClient): void {
  server.tool("e2e_reserve_ip_list", "List all reserved IP addresses", {}, async () => {
    const result = await client.reserveIps.list();
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_reserve_ip_get", "Get reserved IP details", {
    ip_address: z.string().describe("Reserved IP address"),
  }, async ({ ip_address }) => {
    const result = await client.reserveIps.get(ip_address);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_reserve_ip_create", "Reserve a new IP address", {}, async () => {
    const result = await client.reserveIps.create();
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_reserve_ip_delete", "Release a reserved IP address", {
    ip_address: z.string().describe("Reserved IP address"),
  }, async ({ ip_address }) => {
    await client.reserveIps.delete(ip_address);
    return { content: [{ type: "text", text: `Reserved IP ${ip_address} released successfully.` }] };
  });

  server.tool("e2e_reserve_ip_action", "Attach, detach, or live-reserve an IP for a node", {
    ip_address: z.string().describe("Reserved IP address"),
    vm_id: z.number().describe("Node/VM ID"),
    type: z.enum(["attach", "detach", "live-reserve"]).describe("Action type"),
  }, async ({ ip_address, vm_id, type }) => {
    const result = await client.reserveIps.action(ip_address, { vm_id, type });
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_reserve_ip_convert_floating", "Convert a reserved IP to a floating IP", {
    ip_address: z.string().describe("Reserved IP address"),
    node_ids: z.array(z.number()).describe("Node IDs"),
  }, async (params) => {
    const result = await client.reserveIps.convertToFloating(params);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_reserve_ip_attach_floating", "Attach a floating IP to nodes", {
    ip_address: z.string().describe("Floating IP address"),
    node_ids: z.array(z.number()).describe("Node IDs"),
  }, async (params) => {
    await client.reserveIps.attachFloating(params);
    return { content: [{ type: "text", text: `Floating IP ${params.ip_address} attached successfully.` }] };
  });

  server.tool("e2e_reserve_ip_detach_floating", "Detach a floating IP from nodes", {
    ip_address: z.string().describe("Floating IP address"),
    node_ids: z.array(z.number()).describe("Node IDs"),
  }, async (params) => {
    await client.reserveIps.detachFloating(params);
    return { content: [{ type: "text", text: `Floating IP ${params.ip_address} detached successfully.` }] };
  });
}
