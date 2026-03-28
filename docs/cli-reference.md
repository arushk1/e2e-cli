# CLI Reference

## Global Options

| Flag | Description | Default |
|------|-------------|---------|
| `--output <format>` | Output format: `table` or `json` | `table` |
| `--project-id <id>` | Override default project ID | from config |
| `--api-key <key>` | Override API key | from config |
| `--debug` | Show HTTP debug info | off |
| `--no-color` | Disable colors | off |

## Commands

### `e2e configure`
Interactive credential setup. Saves to `~/.e2e/config.json`.

### `e2e node`

| Command | Description | Required Options |
|---------|-------------|-----------------|
| `node list` | List all nodes | - |
| `node get` | Get node details | `--id` |
| `node create` | Create a node | `--name`, `--plan`, `--image`, `--security-group-id` |
| `node delete` | Delete a node | `--id` |
| `node action` | Node action | `--id`, `--type` |

Create options: `--region` (default: ncr), `--ssh-keys`, `--backups`, `--vpc-id`, `--reserve-ip`

Action types: `power_on`, `power_off`, `reboot`, `reinstall`, `lock_vm`, `unlock_vm`, `rename` (requires `--name`)

### `e2e volume`

| Command | Description | Required Options |
|---------|-------------|-----------------|
| `volume list` | List volumes | - |
| `volume get` | Get volume details | `--id` |
| `volume create` | Create a volume | `--name`, `--size`, `--iops` |
| `volume delete` | Delete a volume | `--id` |
| `volume attach` | Attach to node | `--id`, `--vm-id` |
| `volume detach` | Detach from node | `--id`, `--vm-id` |

### `e2e image`

| Command | Description | Required Options |
|---------|-------------|-----------------|
| `image list` | List images | - |
| `image list-categories` | List categories | - |
| `image list-saved` | List saved images | - |
| `image delete` | Delete saved image | `--id` |

### `e2e vpc`

| Command | Description | Required Options |
|---------|-------------|-----------------|
| `vpc list` | List VPCs | - |
| `vpc get` | Get VPC details | `--id` |
| `vpc create` | Create a VPC | `--name` |
| `vpc delete` | Delete a VPC | `--id` |

### `e2e security-group`

| Command | Description | Required Options |
|---------|-------------|-----------------|
| `security-group list` | List security groups | - |
| `security-group get` | Get details | `--id` |

### `e2e firewall`

| Command | Description | Required Options |
|---------|-------------|-----------------|
| `firewall list` | List firewalls | - |
| `firewall get` | Get details | `--id` |
| `firewall create` | Create a firewall | `--name` |
| `firewall delete` | Delete a firewall | `--id` |

### `e2e dns`

| Command | Description | Required Options |
|---------|-------------|-----------------|
| `dns list` | List DNS zones | - |
| `dns get` | Get zone details | `--id` |
| `dns records` | List zone records | `--zone-id` |
| `dns add-record` | Add DNS record | `--zone-id`, `--type`, `--name`, `--content` |
| `dns delete-record` | Delete record | `--zone-id`, `--record-id` |

### `e2e reserve-ip`

| Command | Description | Required Options |
|---------|-------------|-----------------|
| `reserve-ip list` | List reserved IPs | - |
| `reserve-ip get` | Get IP details | `--id` |
| `reserve-ip create` | Reserve new IP | - |
| `reserve-ip delete` | Release IP | `--id` |
