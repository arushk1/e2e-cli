import { Command } from "commander";
import { E2EClient } from "@e2e-cloud/sdk";
import { loadConfig } from "./config.js";
import { registerConfigureCommand } from "./commands/configure.js";
import { registerNodeCommands } from "./commands/node.js";
import { registerVolumeCommands } from "./commands/volume.js";
import { registerImageCommands } from "./commands/image.js";
import { registerVpcCommands } from "./commands/vpc.js";
import { registerSecurityGroupCommands } from "./commands/security-group.js";
import { registerFirewallCommands } from "./commands/firewall.js";
import { registerDnsCommands } from "./commands/dns.js";
import { registerReserveIpCommands } from "./commands/reserve-ip.js";

const program = new Command();

program
  .name("e2e")
  .description("CLI tool for E2E Networks cloud")
  .version("0.1.0")
  .option("--output <format>", "Output format: table or json", "table")
  .option("--project-id <id>", "Override project ID from config")
  .option("--api-key <key>", "Override API key from config")
  .option("--no-color", "Disable colored output")
  .option("--debug", "Show HTTP request/response details");

function createClient(): E2EClient {
  const config = loadConfig();
  const opts = program.opts();

  const apiKey = opts.apiKey ?? config.apiKey;
  const authToken = config.authToken;

  if (!apiKey || !authToken) {
    console.error(
      'Error: Not configured. Run "e2e configure" to set up credentials.'
    );
    process.exit(1);
  }

  return new E2EClient({
    apiKey,
    authToken,
    projectId: opts.projectId ?? config.defaultProjectId,
    location: config.defaultRegion,
    debug: opts.debug,
  });
}

registerConfigureCommand(program);

const lazyClient = () => createClient();

registerNodeCommands(program, lazyClient);
registerVolumeCommands(program, lazyClient);
registerImageCommands(program, lazyClient);
registerVpcCommands(program, lazyClient);
registerSecurityGroupCommands(program, lazyClient);
registerFirewallCommands(program, lazyClient);
registerDnsCommands(program, lazyClient);
registerReserveIpCommands(program, lazyClient);

program.parse();
