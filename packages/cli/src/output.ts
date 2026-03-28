import Table from "cli-table3";

export function formatOutput(
  data: unknown,
  format?: string,
  columns?: string[]
): void {
  if (data == null) {
    if (format === "json") {
      console.log("[]");
    } else {
      console.log("No results.");
    }
    return;
  }

  if (format === "json") {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  // Single object — display as key-value table
  if (!Array.isArray(data)) {
    const obj = data as Record<string, unknown>;
    const table = new Table();
    for (const [key, val] of Object.entries(obj)) {
      table.push({ [key]: String(val ?? "") });
    }
    console.log(table.toString());
    return;
  }

  const cols =
    columns ?? (data.length > 0 ? Object.keys(data[0] as object) : []);
  const table = new Table({ head: cols });

  for (const row of data) {
    const r = row as Record<string, unknown>;
    table.push(cols.map((c) => String(r[c] ?? "")));
  }

  console.log(table.toString());
}
