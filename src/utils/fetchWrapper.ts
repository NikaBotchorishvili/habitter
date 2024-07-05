"use server"
import { headers as nextHeaders } from "next/headers";

const baseURL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

interface FetchWrapperOptions extends RequestInit {
  body?: any;
}

const fetchWrapper = async <T>(
  endpoint: string,
  options: FetchWrapperOptions = {}
): Promise<Response> => {
  const url = `${baseURL}${endpoint}`;

  // Convert next/headers to a plain object
  const defaultHeaders = Object.fromEntries(nextHeaders().entries());
  const filteredHeaders = Object.fromEntries(
    Object.entries(defaultHeaders).filter(([key]) => key.toLowerCase() !== "content-length")
  );
  // Merge headers with any additional headers provided in options
  const finalHeaders: Record<string, string> = {
    ...filteredHeaders,
    ...(options.headers ? Object.fromEntries(new Headers(options.headers).entries()) : {}),
  };

  let body: any = options.body;

  if (body && typeof body === "object" && !(body instanceof FormData)) {
    body = JSON.stringify(body);
    finalHeaders["Content-Type"] = "application/json";
  }

  const finalOptions: RequestInit = { ...options, headers: finalHeaders, body };


  try {
    const response = await fetch(url, finalOptions);


    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error Data:", errorData);
      throw new Error(errorData.message || "Something went wrong");
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default fetchWrapper;
