import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { E2EClient } from "@e2e-cloud/sdk";

export function registerImageTools(
  server: McpServer,
  client: E2EClient
): void {
  server.tool("e2e_image_list", "List available OS images", {
    category: z.string().optional().describe("Filter by category"),
    os: z.string().optional().describe("Filter by OS type"),
    image_type: z.string().optional().describe("Filter by type (e.g., private)"),
  }, async (params) => {
    const result = await client.images.list(
      params.category || params.os || params.image_type
        ? { display_category: params.category, category: params.os, image_type: params.image_type }
        : undefined
    );
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_image_list_categories", "List image categories (OS types and versions)", {}, async () => {
    const result = await client.images.listCategories();
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_image_list_saved", "List saved/custom images", {}, async () => {
    const result = await client.images.listSaved();
    return { content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }] };
  });

  server.tool("e2e_image_delete", "Delete a saved image", {
    id: z.number().describe("Image ID"),
  }, async ({ id }) => {
    await client.images.delete(id);
    return { content: [{ type: "text", text: `Image ${id} deleted successfully.` }] };
  });
}
