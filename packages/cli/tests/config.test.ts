import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

// Must mock before importing config
vi.mock("node:os", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:os")>();
  return {
    ...actual,
    default: {
      ...actual,
      homedir: () => "/tmp/test-home-e2e",
    },
    homedir: () => "/tmp/test-home-e2e",
  };
});

import { loadConfig, saveConfig, getConfigPath } from "../src/config.js";

describe("config", () => {
  const configDir = "/tmp/test-home-e2e/.e2e";
  const configFile = path.join(configDir, "config.json");

  beforeEach(() => {
    if (fs.existsSync(configDir)) fs.rmSync(configDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(configDir)) fs.rmSync(configDir, { recursive: true });
  });

  it("getConfigPath() returns ~/.e2e/config.json", () => {
    expect(getConfigPath()).toBe(configFile);
  });

  it("loadConfig() returns empty config when file does not exist", () => {
    expect(loadConfig()).toEqual({});
  });

  it("saveConfig() creates dir and writes config", () => {
    saveConfig({
      apiKey: "key123",
      authToken: "token456",
      defaultProjectId: "proj-1",
      defaultRegion: "ncr",
    });
    expect(fs.existsSync(configFile)).toBe(true);
    const data = JSON.parse(fs.readFileSync(configFile, "utf-8"));
    expect(data.apiKey).toBe("key123");
  });

  it("loadConfig() reads saved config", () => {
    saveConfig({ apiKey: "key", authToken: "tok" });
    const config = loadConfig();
    expect(config.apiKey).toBe("key");
    expect(config.authToken).toBe("tok");
  });
});
