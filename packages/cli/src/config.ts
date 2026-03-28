import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export interface CliConfig {
  apiKey?: string;
  authToken?: string;
  defaultProjectId?: string;
  defaultRegion?: string;
}

export function getConfigPath(): string {
  return path.join(os.homedir(), ".e2e", "config.json");
}

export function loadConfig(): CliConfig {
  const configPath = getConfigPath();
  if (!fs.existsSync(configPath)) return {};
  const raw = fs.readFileSync(configPath, "utf-8");
  return JSON.parse(raw) as CliConfig;
}

export function saveConfig(config: CliConfig): void {
  const configPath = getConfigPath();
  const dir = path.dirname(configPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
}
