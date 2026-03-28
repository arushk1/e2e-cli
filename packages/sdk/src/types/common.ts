export interface E2EClientConfig {
  apiKey: string;
  authToken: string;
  baseUrl?: string;
  projectId?: string;
  location?: string;
  debug?: boolean;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  errors: unknown[];
  data: T;
}

export interface RequestParams {
  [key: string]: string | number | boolean | undefined;
}
