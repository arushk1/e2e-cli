# E2E Cloud CLI

An open-source, AWS-style command-line toolkit for [E2E Networks](https://www.e2enetworks.com/) cloud infrastructure. Manage your nodes, volumes, VPCs, DNS, and more -- from the terminal, from code, or from AI assistants.

```
$ e2e node list

 id      name            status   plan     public_ip_address
 100001  web-server      Running  C3.8GB   203.0.113.10
 100002  api-backend     Running  C3.16GB  203.0.113.11
 100003  db-primary      Running  C3.32GB  203.0.113.12
 100004  staging         Stopped  C3.8GB   203.0.113.13
```

## What's Included

This is a TypeScript monorepo with four packages:

| Package | What it does | Install |
|---------|-------------|---------|
| **`@e2e-cloud/sdk`** | TypeScript SDK -- programmatic access to the E2E Networks API | `npm install @e2e-cloud/sdk` |
| **`@e2e-cloud/cli`** | AWS-style CLI tool | `npm install -g @e2e-cloud/cli` |
| **`@e2e-cloud/mcp-server`** | MCP server -- lets AI assistants (Claude, etc.) manage your infrastructure | `npx @e2e-cloud/mcp-server` |
| **`@e2e-cloud/skill`** | Claude Code skill with guided workflows | Copy `SKILL.md` to `~/.claude/skills/` |

All four packages share a single SDK core, so adding a new service means writing it once.

## Quick Start

### 1. Install

```bash
npm install -g @e2e-cloud/cli
```

### 2. Get Credentials

Create an API token at [E2E MyAccount > API & IAM](https://myaccount.e2enetworks.com/services/apiiam). You'll get an **API key** and an **auth token**.

### 3. Configure

```bash
e2e configure
```

This saves your credentials to `~/.e2e/config.json`. Both the CLI and MCP server read from this file.

Alternatively, create the file manually:

```json
{
  "apiKey": "your-api-key",
  "authToken": "your-auth-token",
  "defaultRegion": "Delhi"
}
```

### 4. Use

```bash
e2e node list                   # Table output (default)
e2e node list --output json     # JSON output (pipe to jq, scripts, etc.)
e2e node get --id 12345         # Detailed info for a single node
e2e vpc list                    # List your VPCs
e2e security-group list         # List security groups
```

## CLI Reference

### Services

| Service | Commands |
|---------|----------|
| **`e2e node`** | `list`, `get`, `create`, `delete`, `action` (power_on, power_off, reboot, reinstall, lock, unlock, rename) |
| **`e2e volume`** | `list`, `get`, `create`, `delete`, `attach`, `detach` |
| **`e2e image`** | `list`, `list-categories`, `list-saved`, `delete` |
| **`e2e vpc`** | `list`, `get`, `create`, `delete` |
| **`e2e security-group`** | `list`, `get`, `create`, `update`, `delete`, `mark-default` |
| **`e2e firewall`** | `list`, `get`, `create`, `delete` |
| **`e2e dns`** | `list`, `get`, `create`, `delete`, `verify-ns`, `verify-validity`, `verify-ttl` |
| **`e2e reserve-ip`** | `list`, `get`, `create`, `delete`, `action`, `convert-floating`, `attach-floating`, `detach-floating` |

### Global Flags

```
--output <format>   Output format: table (default) or json
--project-id <id>   Override project ID
--api-key <key>     Override API key
--debug             Show HTTP request/response details
--no-color          Disable colored output
```

### Examples

```bash
# Create a compute node
e2e node create \
  --name my-server \
  --plan C-2 \
  --image Ubuntu-22.04-Starter \
  --ssh-keys "ssh-ed25519 AAAA... user@example.com" \
  --security-group-id 12345 \
  --region ncr

# Create a volume and attach it
e2e volume create --name data-vol --size 500 --iops 10000
e2e volume attach --id 100 --vm-id 12345

# Manage DNS
e2e dns list
e2e dns create --domain-name example.com --ip-address 1.2.3.4

# Power off a node
e2e node action --id 12345 --type power_off

# Pipe JSON to other tools
e2e node list --output json | jq '.[].name'
```

## SDK Usage

Use the SDK directly in your TypeScript/JavaScript applications:

```typescript
import { E2EClient } from "@e2e-cloud/sdk";

const client = new E2EClient({
  apiKey: "your-api-key",
  authToken: "your-auth-token",
  location: "Delhi",
});

// List all nodes
const { data: nodes } = await client.nodes.list();
console.log(nodes);

// Create a node
const { data: createResult } = await client.nodes.create({
  name: "my-node",
  region: "ncr",
  plan: "C-2",
  image: "Ubuntu-22.04-Starter",
  ssh_keys: ["ssh-ed25519 AAAA... user@example.com"],
  security_group_id: 12345,
});
const nodeId = createResult.node_create_response[0]?.id;

// Power off
if (nodeId) await client.nodes.action(nodeId, { type: "power_off" });

// Volumes
const { data: volumes } = await client.volumes.list();
await client.volumes.create({ name: "data", size: 500, iops: 10000 });

// VPCs
await client.vpcs.create({
  vpc_name: "my-vpc",
  ipv4: "10.10.0.0/23",
  is_e2e_vpc: false,
});

// DNS
const { data: domains } = await client.dns.list();
await client.dns.create({
  domain_name: "example.com",
  ip_addr: "1.2.3.4",
});
```

## MCP Server (AI-Powered Infrastructure)

The MCP server lets AI assistants like Claude manage your E2E Networks infrastructure through natural language.

### Setup

Add to your Claude Code settings (`~/.claude/settings.json`):

```json
{
  "mcpServers": {
    "e2e-cloud": {
      "command": "npx",
      "args": ["@e2e-cloud/mcp-server"]
    }
  }
}
```

The MCP server reads credentials from `~/.e2e/config.json` (same file as the CLI).

### What You Can Do

Once configured, you can ask Claude things like:

- "List all my running nodes"
- "Create a new Ubuntu node with 8GB RAM"
- "Attach a 500GB volume to my backend server"
- "Create DNS forwarding for my domain"
- "Power off the testing server"

### Available Tools

The server exposes 30+ tools: `e2e_node_list`, `e2e_node_create`, `e2e_volume_attach`, `e2e_dns_create`, and more. See [MCP Setup](docs/mcp-setup.md) for the full list.

## Project Structure

```
e2e-cli/
├── packages/
│   ├── sdk/           # Shared TypeScript SDK (API client, types, services)
│   ├── cli/           # AWS-style CLI (commander.js)
│   ├── mcp-server/    # MCP server (stdio transport)
│   └── skill/         # Claude Code skill (SKILL.md)
├── docs/              # Documentation
├── package.json       # npm workspaces root
└── tsconfig.base.json # Shared TypeScript config
```

### Architecture

```
  CLI (commander.js)          MCP Server (@modelcontextprotocol/sdk)
         \                          /
          \                        /
           +--- SDK (axios) ------+
                    |
            E2E Networks API
   https://api.e2enetworks.com/myaccount/api/v1
```

Both the CLI and MCP server are thin wrappers over the shared SDK. The SDK handles authentication (API key + Bearer token), HTTP requests, error normalization, and response typing.

## Development

### Prerequisites

- Node.js >= 18
- npm >= 9

### Setup

```bash
git clone https://github.com/arushk1/e2e-cli.git
cd e2e-cli
npm install
```

### Build

```bash
npm run build        # Build all packages
```

### Test

```bash
npm test             # Run all tests (47 tests across 3 packages)
```

### Adding a New Service

Every service follows the same pattern. To add support for a new E2E Networks API endpoint:

1. Add types in `packages/sdk/src/types/<service>.ts`
2. Add service class in `packages/sdk/src/services/<service>.ts`
3. Register on `E2EClient` in `packages/sdk/src/client.ts`
4. Add CLI command in `packages/cli/src/commands/<service>.ts`
5. Add MCP tools in `packages/mcp-server/src/tools/<service>.ts`
6. Add tests in `packages/sdk/tests/services/<service>.test.ts`

See [Adding New Services](docs/adding-services.md) for a detailed guide with code templates.

## Roadmap

- **Phase 1 (current):** Nodes, Volumes, Images, VPC, Security Groups, Firewalls, DNS, Reserve IP
- **Phase 2:** Object Storage, Scalable File System, DBaaS (MySQL, PostgreSQL, Valkey, Kafka), Container Registry
- **Phase 3:** CDN, Billing, Auto Scaling, Kubernetes, CDP Backup
- **Phase 4:** TIR API (GPU instances, model endpoints, training clusters, RAG, GenAI)

## API Reference

- **Base URL:** `https://api.e2enetworks.com/myaccount/api/v1`
- **Auth:** API key (query param `?apikey=`) + Bearer token (`Authorization: Bearer`)
- **Regions:** Delhi, Chennai
- **Docs:** [docs.e2enetworks.com/api/myaccount](https://docs.e2enetworks.com/api/myaccount/)
- **Token creation:** [myaccount.e2enetworks.com/services/apiiam](https://myaccount.e2enetworks.com/services/apiiam)

## Contributing

Contributions are welcome! Whether it's adding new services, fixing bugs, improving docs, or suggesting features.

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/object-storage`)
3. Make your changes
4. Run tests (`npm test`)
5. Submit a PR

## License

MIT
