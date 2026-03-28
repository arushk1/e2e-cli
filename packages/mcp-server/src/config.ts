import fs from "node:fs";
import path from "node:path";
import os from "node:os";

interface Config {
  apiKey?: string;
  authToken?: string;
  defaultProjectId?: string;
  defaultRegion?: string;
}

export function loadConfig(): Config {
  const configPath = path.join(os.homedir(), ".e2e", "config.json");
  if (!fs.existsSync(configPath)) return {};
  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}
