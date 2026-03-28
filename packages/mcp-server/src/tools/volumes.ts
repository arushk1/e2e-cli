import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { E2EClient } from "@e2e-cloud/sdk";

export function registerVolumeTools(
  server: McpServer,
  client: E2EClient
): void {
  server.tool(
    "e2e_volume_list",
    "List all block storage volumes",
    {},
    async () => {
      const result = await client.volumes.list();
      return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
    }
  );

  server.tool("e2e_volume_get", "Get volume details", {
    id: z.number().describe("Volume ID"),
  }, async ({ id }) => {
    const result = await client.volumes.get(id);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_volume_create", "Create a new block storage volume", {
    name: z.string().describe("Volume name"),
    size: z.number().describe("Size in GB (250, 500, 1000, 2000, 4000, 8000, 16000)"),
    iops: z.number().describe("IOPS (5000, 10000, 20000, 40000, 80000, 120000)"),
  }, async (params) => {
    const result = await client.volumes.create(params);
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_volume_delete", "Delete a block storage volume", {
    id: z.number().describe("Volume ID"),
  }, async ({ id }) => {
    await client.volumes.delete(id);
    return { content: [{ type: "text", text: `Volume ${id} deleted successfully.` }] };
  });

  server.tool("e2e_volume_attach", "Attach a volume to a compute node", {
    volume_id: z.number().describe("Volume ID"),
    vm_id: z.number().describe("Node/VM ID to attach to"),
  }, async ({ volume_id, vm_id }) => {
    await client.volumes.attach(volume_id, vm_id);
    return { content: [{ type: "text", text: `Volume ${volume_id} attached to node ${vm_id}.` }] };
  });

  server.tool("e2e_volume_detach", "Detach a volume from a compute node", {
    volume_id: z.number().describe("Volume ID"),
    vm_id: z.number().describe("Node/VM ID to detach from"),
  }, async ({ volume_id, vm_id }) => {
    await client.volumes.detach(volume_id, vm_id);
    return { content: [{ type: "text", text: `Volume ${volume_id} detached from node ${vm_id}.` }] };
  });
}
