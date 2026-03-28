# Getting Started

## Prerequisites

- Node.js >= 18
- An E2E Networks account with API access

## Installation

```bash
npm install -g @e2e-cloud/cli
```

## Configuration

1. Create an API token at https://myaccount.e2enetworks.com/services/apiiam
2. Run the configure command:

```bash
e2e configure
```

3. Enter your API key, auth token, default project ID, and region.

The configuration is saved to `~/.e2e/config.json`.

## First Commands

```bash
# Check available images
e2e image list-categories

# List your nodes
e2e node list

# List security groups (you'll need one to create a node)
e2e security-group list

# Create a node
e2e node create --name my-first-node --plan C-2 --image Ubuntu-22.04-Starter --security-group-id <id>

# Check node status
e2e node get --id <node-id>
```

## Output Formats

By default, output is displayed as a table. Use `--output json` for JSON:

```bash
e2e node list --output json
e2e node list --output json | jq '.[] | .name'
```

## Global Options

- `--output <format>` - Output format: `table` (default) or `json`
- `--project-id <id>` - Override project ID from config
- `--api-key <key>` - Override API key from config
- `--debug` - Show HTTP request/response details
- `--no-color` - Disable colored output
