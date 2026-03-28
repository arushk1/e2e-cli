export class E2EApiError extends Error {
  public readonly statusCode: number;
  public readonly responseCode: number;
  public readonly errors: unknown[];

  constructor(params: {
    message: string;
    statusCode: number;
    responseCode: number;
    errors?: unknown[];
  }) {
    super(params.message);
    this.name = "E2EApiError";
    this.statusCode = params.statusCode;
    this.responseCode = params.responseCode;
    this.errors = params.errors ?? [];
  }
}
