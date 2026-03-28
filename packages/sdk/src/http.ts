import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
} from "axios";
import { E2EApiError } from "./errors.js";
import type { ApiResponse, RequestParams } from "./types/common.js";

export interface HttpClientConfig {
  apiKey: string;
  authToken: string;
  baseUrl: string;
  projectId?: string;
  location?: string;
  debug?: boolean;
}

export class HttpClient {
  private readonly axios: AxiosInstance;
  private readonly apiKey: string;
  private readonly projectId?: string;
  private readonly location?: string;
  private readonly debug: boolean;

  constructor(config: HttpClientConfig) {
    this.apiKey = config.apiKey;
    this.projectId = config.projectId;
    this.location = config.location;
    this.debug = config.debug ?? false;

    this.axios = axios.create({
      baseURL: config.baseUrl,
      headers: {
        Authorization: `Bearer ${config.authToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  private defaultParams(): Record<string, string> {
    const params: Record<string, string> = { apikey: this.apiKey };
    if (this.projectId) params.project_id = this.projectId;
    if (this.location) params.location = this.location;
    return params;
  }

  private mergeParams(
    extra?: RequestParams
  ): Record<string, string | number | boolean> {
    const base = this.defaultParams();
    if (!extra) return base;
    const merged: Record<string, string | number | boolean> = { ...base };
    for (const [k, v] of Object.entries(extra)) {
      if (v !== undefined) merged[k] = v;
    }
    return merged;
  }

  private handleError(err: unknown): never {
    if (axios.isAxiosError(err)) {
      const axErr = err as AxiosError<{
        code: number;
        message: string;
        errors: unknown[];
      }>;
      const data = axErr.response?.data;
      throw new E2EApiError({
        message: data?.message ?? axErr.message,
        statusCode: axErr.response?.status ?? 0,
        responseCode: data?.code ?? 0,
        errors: data?.errors,
      });
    }
    throw err;
  }

  async get<T>(
    path: string,
    params?: RequestParams
  ): Promise<ApiResponse<T>> {
    try {
      if (this.debug) console.error(`GET ${path}`, params);
      const res: AxiosResponse<ApiResponse<T>> = await this.axios.get(path, {
        params: this.mergeParams(params),
      });
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async post<T>(
    path: string,
    body?: unknown,
    params?: RequestParams
  ): Promise<ApiResponse<T>> {
    try {
      if (this.debug) console.error(`POST ${path}`, body);
      const res: AxiosResponse<ApiResponse<T>> = await this.axios.post(
        path,
        body,
        { params: this.mergeParams(params) }
      );
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async put<T>(
    path: string,
    body?: unknown,
    params?: RequestParams
  ): Promise<ApiResponse<T>> {
    try {
      if (this.debug) console.error(`PUT ${path}`, body);
      const res: AxiosResponse<ApiResponse<T>> = await this.axios.put(
        path,
        body,
        { params: this.mergeParams(params) }
      );
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async delete<T>(
    path: string,
    params?: RequestParams
  ): Promise<ApiResponse<T>> {
    try {
      if (this.debug) console.error(`DELETE ${path}`);
      const res: AxiosResponse<ApiResponse<T>> = await this.axios.delete(
        path,
        { params: this.mergeParams(params) }
      );
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }
}
