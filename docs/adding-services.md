# Adding New Services

Each service follows an identical pattern across SDK, CLI, and MCP server. Here's how to add a new one.

## 1. SDK Types

Create `packages/sdk/src/types/<service>.ts`:

```typescript
export interface MyResource {
  id: number;
  name: string;
  // ... fields from API response
}

export interface CreateMyResourceParams {
  name: string;
  // ... fields for creation
}
```

## 2. SDK Service

Create `packages/sdk/src/services/<service>.ts`:

```typescript
import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type { MyResource, CreateMyResourceParams } from "../types/<service>.js";

export class MyResourceService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ApiResponse<MyResource[]>> {
    return this.http.get<MyResource[]>("/<api_path>/");
  }

  async get(id: number): Promise<ApiResponse<MyResource>> {
    return this.http.get<MyResource>(`/<api_path>/${id}/`);
  }

  async create(params: CreateMyResourceParams): Promise<ApiResponse<MyResource>> {
    return this.http.post<MyResource>("/<api_path>/", params);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<void>(`/<api_path>/${id}/`);
  }
}
```

## 3. Register in E2EClient

In `packages/sdk/src/client.ts`, add the import and property:

```typescript
import { MyResourceService } from "./services/<service>.js";

// In constructor:
public readonly myResources: MyResourceService;
this.myResources = new MyResourceService(this.http);
```

## 4. Export from SDK index

In `packages/sdk/src/index.ts`, add exports for types and service.

## 5. CLI Command

Create `packages/cli/src/commands/<service>.ts` following the pattern in existing commands.

Register in `packages/cli/src/index.ts`.

## 6. MCP Tools

Create `packages/mcp-server/src/tools/<service>.ts` following the pattern in existing tools.

Register in `packages/mcp-server/src/index.ts`.

## 7. Update SKILL.md

Add the new tools and any relevant workflows to `packages/skill/SKILL.md`.

## 8. Tests

Add tests for the service in `packages/sdk/tests/services/<service>.test.ts`.
