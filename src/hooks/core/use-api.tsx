import { httpClient, APIError } from "@/lib/api/http-client";
import { useState, useCallback } from "react";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

type UseAPIOptions<R> = {
	method?: HTTPMethod;
  onSuccess?: (data: R) => void;
  onError?: (error: string) => void;
} & Omit<RequestInit, "method" | "body">;

type UseAPIReturn<TResponse, TRequest = unknown> = {
	isLoading: boolean;
	isError: boolean;
	error: string | null;
	data: TResponse | null;
	fetcher: (body?: TRequest) => Promise<TResponse | null>;
	reset: () => void;
  isSuccess: boolean;
};

export default function useAPI<TResponse = unknown, TRequest = unknown>(
	path: string,
	options: UseAPIOptions<TResponse> = {}
): UseAPIReturn<TResponse, TRequest> {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<TResponse | null>(null);

	const { method = "GET", onSuccess, onError, ...requestOptions } = options;

	const fetcher = useCallback(
		async (body?: TRequest): Promise<TResponse | null> => {
			setIsLoading(true);
			setIsError(false);
      setIsSuccess(false);
			setError(null);

			try {
				let response;

				switch (method) {
					case "GET":
            const params = body ? `?${new URLSearchParams(body as Record<string, string>).toString()}` : "";
						response = await httpClient.get<TResponse>(`${path}${params}`, requestOptions);
						break;
					case "POST":
						response = await httpClient.post<TRequest, TResponse>(
							path,
							body as TRequest,
							requestOptions
						);
						break;
					case "PUT":
						response = await httpClient.put<TRequest, TResponse>(
							path,
							body as TRequest,
							requestOptions
						);
						break;
					case "DELETE":
						response = await httpClient.delete<TResponse>(path, requestOptions);
						break;
					default:
						throw new Error(`Unsupported HTTP method: ${method}`);
				}

				setData(response.data);
				setIsLoading(false);
        setIsSuccess(true);
        onSuccess?.(response.data);
				return response.data;
			} catch (err) {
				setIsError(true);
				setIsLoading(false);
        setIsSuccess(false);

				if (err instanceof APIError) {
					setError(err.message);
          onError?.(err.message);
				} else if (err instanceof Error) {
					setError(err.message);
          onError?.(err.message);
				} else {
					setError("An unexpected error occurred");
          onError?.("An unexpected error occurred");
				}

				return null;
			}
		},
		[method, onError, onSuccess, path, requestOptions]
	);

	const reset = useCallback(() => {
		setIsLoading(false);
		setIsError(false);
		setError(null);
		setData(null);
    setIsSuccess(false);
	}, []);

	return {
		isLoading,
		isError,
		error,
		data,
		fetcher,
		reset,
    isSuccess,
	};
}

