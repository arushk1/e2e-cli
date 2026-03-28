import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { E2EClient } from "@e2e-cloud/sdk";
import { loadConfig } from "./config.js";
import { registerNodeTools } from "./tools/nodes.js";
import { registerVolumeTools } from "./tools/volumes.js";
import { registerImageTools } from "./tools/images.js";
import { registerVpcTools } from "./tools/vpcs.js";
import { registerSecurityGroupTools } from "./tools/security-groups.js";
import { registerFirewallTools } from "./tools/firewalls.js";
import { registerDnsTools } from "./tools/dns.js";
import { registerReserveIpTools } from "./tools/reserve-ips.js";

async function main() {
  const config = loadConfig();

  if (!config.apiKey || !config.authToken) {
    console.error('Error: Not configured. Run "e2e configure" first.');
    process.exit(1);
  }

  const client = new E2EClient({
    apiKey: config.apiKey,
    authToken: config.authToken,
    projectId: config.defaultProjectId,
    location: config.defaultRegion,
  });

  const server = new McpServer({
    name: "e2e-cloud",
    version: "0.1.0",
  });

  registerNodeTools(server, client);
  registerVolumeTools(server, client);
  registerImageTools(server, client);
  registerVpcTools(server, client);
  registerSecurityGroupTools(server, client);
  registerFirewallTools(server, client);
  registerDnsTools(server, client);
  registerReserveIpTools(server, client);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("MCP server error:", err);
  process.exit(1);
});
