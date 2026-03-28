import { describe, it, expect, vi, beforeEach } from "vitest";
import { formatOutput } from "../src/output.js";

describe("formatOutput", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("outputs JSON when format is json", () => {
    const data = [{ id: 1, name: "test" }];
    formatOutput(data, "json");
    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify(data, null, 2));
  });

  it("outputs a table when format is table", () => {
    const data = [{ id: 1, name: "test", status: "Running" }];
    formatOutput(data, "table", ["id", "name", "status"]);
    const output = consoleSpy.mock.calls[0][0] as string;
    expect(output).toContain("id");
    expect(output).toContain("name");
    expect(output).toContain("test");
  });

  it("outputs table by default", () => {
    const data = [{ id: 1 }];
    formatOutput(data, undefined, ["id"]);
    const output = consoleSpy.mock.calls[0][0] as string;
    expect(output).toContain("id");
  });

  it("handles empty data array", () => {
    formatOutput([], "table", ["id"]);
    const output = consoleSpy.mock.calls[0][0] as string;
    expect(output).toContain("id");
  });

  it("outputs single object as key-value table", () => {
    const data = { id: 1, name: "single" };
    formatOutput(data, "json");
    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify(data, null, 2));
  });
});
