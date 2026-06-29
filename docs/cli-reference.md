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
| `node create` | Create a node | `--name`, `--plan`, `--image`, `--ssh-keys` |
| `node delete` | Delete a node | `--id` |
| `node action` | Node action | `--id`, `--type` |

Create options: `--region` (default: ncr), `--security-group-id`, `--backups`, `--vpc-id`, `--subnet-id`, `--reserve-ip`, `--default-public-ip`, `--number-of-instances`

Action types: `power_on`, `power_off`, `reboot`, `reinstall`, `save_images`, `lock_vm`, `unlock_vm`, `rename`, `enable_accidental_protection`, `disable_accidental_protection`, `enable_node_compliance`, `disable_node_compliance`

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

Create options: `--ipv4` for a custom CIDR, or `--e2e-vpc` to let E2E assign one automatically.

### `e2e security-group`

| Command | Description | Required Options |
|---------|-------------|-----------------|
| `security-group list` | List security groups | - |
| `security-group get` | Get details | `--id` |
| `security-group create` | Create security group | `--name` |
| `security-group update` | Update security group | `--id` |
| `security-group delete` | Delete security group | `--id` |
| `security-group mark-default` | Mark default security group | `--id` |

### `e2e firewall`

| Command | Description | Required Options |
|---------|-------------|-----------------|
| `firewall list` | List firewalls | - |
| `firewall get` | Get details | `--id` |
| `firewall create` | Create a Fortigate firewall | `--name`, `--plan`, `--image`, `--vpc-id`, `--cn-id` |
| `firewall delete` | Delete a firewall | `--id` |

### `e2e dns`

| Command | Description | Required Options |
|---------|-------------|-----------------|
| `dns list` | List DNS forwarding domains | - |
| `dns get` | Get domain details | `--domain-name` |
| `dns create` | Create DNS forwarding domain | `--domain-name`, `--ip-address` |
| `dns delete` | Delete DNS forwarding domain | `--domain-id` |
| `dns verify-ns` | Verify nameservers | `--domain-name` |
| `dns verify-validity` | Diagnose domain validity | `--domain-name` |
| `dns verify-ttl` | Diagnose TTL | `--domain-name` |

### `e2e reserve-ip`

| Command | Description | Required Options |
|---------|-------------|-----------------|
| `reserve-ip list` | List reserved IPs | - |
| `reserve-ip get` | Get IP details | `--ip-address` |
| `reserve-ip create` | Reserve new IP | - |
| `reserve-ip delete` | Release IP | `--ip-address` |
| `reserve-ip action` | Attach, detach, or live-reserve IP | `--ip-address`, `--vm-id`, `--type` |
| `reserve-ip convert-floating` | Convert reserved IP to floating IP | `--ip-address`, `--node-ids` |
| `reserve-ip attach-floating` | Attach floating IP | `--ip-address`, `--node-ids` |
| `reserve-ip detach-floating` | Detach floating IP | `--ip-address`, `--node-ids` |
