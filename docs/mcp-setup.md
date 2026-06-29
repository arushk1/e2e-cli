# MCP Server Setup

The E2E Cloud MCP server exposes infrastructure management tools to AI assistants like Claude.

## Prerequisites

1. Install and configure the CLI first:
   ```bash
   npm install -g @e2e-cloud/cli
   e2e configure
   ```

2. The MCP server reads credentials from `~/.e2e/config.json` (same file the CLI uses).

## Claude Code Configuration

Add to your Claude Code settings (`.claude/settings.json` or global settings):

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

## Available Tools

The MCP server exposes these tools:

- **Nodes:** `e2e_node_list`, `e2e_node_get`, `e2e_node_create`, `e2e_node_delete`, `e2e_node_action`
- **Volumes:** `e2e_volume_list`, `e2e_volume_get`, `e2e_volume_create`, `e2e_volume_delete`, `e2e_volume_attach`, `e2e_volume_detach`
- **Images:** `e2e_image_list`, `e2e_image_list_categories`, `e2e_image_list_saved`, `e2e_image_delete`
- **VPCs:** `e2e_vpc_list`, `e2e_vpc_get`, `e2e_vpc_create`, `e2e_vpc_delete`
- **Security Groups:** `e2e_security_group_list`, `e2e_security_group_get`, `e2e_security_group_create`, `e2e_security_group_update`, `e2e_security_group_delete`, `e2e_security_group_mark_default`
- **Firewalls:** `e2e_firewall_list`, `e2e_firewall_get`, `e2e_firewall_create`, `e2e_firewall_delete`
- **DNS:** `e2e_dns_list`, `e2e_dns_get`, `e2e_dns_create`, `e2e_dns_delete`, `e2e_dns_verify_nameservers`, `e2e_dns_verify_validity`, `e2e_dns_verify_ttl`
- **Reserve IPs:** `e2e_reserve_ip_list`, `e2e_reserve_ip_get`, `e2e_reserve_ip_create`, `e2e_reserve_ip_delete`, `e2e_reserve_ip_action`, `e2e_reserve_ip_convert_floating`, `e2e_reserve_ip_attach_floating`, `e2e_reserve_ip_detach_floating`

## Skill Installation

Copy the skill file for a guided experience:

```bash
cp packages/skill/SKILL.md ~/.claude/skills/e2e-cloud.md
```

Then invoke with `/e2e` in Claude Code.
