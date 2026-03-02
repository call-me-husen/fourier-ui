type APIResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export class APIError extends Error {
  code: string;
  statusCode: number;

  constructor(code: string, statusCode: number, message: string) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = "APIError";
  }
}

class HttpClient {
  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "/api";

  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<APIResponse<T>> {
    const apiPath = `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    
    try {
      const response = await fetch(apiPath, {
        ...options,
        credentials: "include",
      });
      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new APIError(
          "INVALID_RESPONSE",
          response.status || 500,
          "Received an invalid response from the server.",
        );
      }

      const data = await response.json();
      if (!response.ok) {
        console.log("API Error Response:", { path, options, response, data });
        throw new APIError(
          data.code || "ERROR",
          response.status || 500,
          data.message || "An error occurred while processing the request.",
        );
      }

      return data as APIResponse<T>;
    } catch (error) {
      // Unexpected error (e.g., network error, invalid JSON)
      if (error instanceof APIError) {
        throw error; // Re-throw API errors
      }
      throw new APIError(
        "BAD_REQUEST",
        400,
        "An unexpected error occurred while processing the request.",
      );
    }
  }

  async get<T>(
    path: string,
    options: Omit<RequestInit, "method"> = {},
  ): Promise<APIResponse<T>> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  async post<R, T>(
    path: string,
    body: R = {} as R,
    options: Omit<RequestInit, "method" | "body"> = {},
  ): Promise<APIResponse<T>> {
    if (body instanceof FormData) {
      return this.request<T>(path, {
        ...options,
        method: "POST",
        body,
      });
    }

    return this.request<T>(path, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(body),
    });
  }

  async put<R, T>(
    path: string,
    body: R,
    options: Omit<RequestInit, "method" | "body"> = {},
  ): Promise<APIResponse<T>> {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(body),
    });
  }

  async delete<T>(
    path: string,
    options: Omit<RequestInit, "method"> = {},
  ): Promise<APIResponse<T>> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}

export const httpClient = new HttpClient();
