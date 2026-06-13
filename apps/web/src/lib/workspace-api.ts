import type {
  WorkspaceCurrentDay,
  WorkspaceExecutionResult,
  WorkspaceValidationResult,
  WorkspaceSyncActionRequest,
  WorkspaceSyncResponse,
} from "../types/workspace";

// 💚 Point directly to your NestJS server port to bypass Vite proxy header mutations
const API_BASE_URL = "http://localhost:3001";

export interface WorkspaceRunRequest {
  day: number;
  language: "sql" | "python" | "typescript" | "text";
  code: string;
}

export interface WorkspaceRunResponse {
  executionResult: WorkspaceExecutionResult;
  validationResult: WorkspaceValidationResult;
}

export interface WorkspaceSubmitRequest {
  day: number;
  code: string;
}

export interface WorkspaceSubmitResponse {
  success: boolean;
  nextDay?: number | null;
  message: string;
}

export interface WorkspaceTelemetryRequest {
  day: number;
  eventType:
    | "RUN_CODE"
    | "RUN_WARNING"
    | "RUN_ERROR"
    | "SUBMIT_SUCCESS"
    | "SUBMIT_FAIL"
    | "REPATH_TRIGGER"
    | "CHOICE_SELECTED"
    | "FINANCIAL_INPUT_CHANGED";
  metadata?: Record<string, unknown>;
}

function buildHeaders(token?: string | null, hasJsonBody = false) {
  return {
    ...(hasJsonBody ? { "Content-Type": "application/json" } : {}),
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parseJson<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `Workspace request failed (${response.status} ${response.statusText}): ${text.slice(0, 300)}`,
    );
  }

  if (!contentType.includes("application/json")) {
    throw new Error(
      `Expected JSON but received ${contentType || "unknown content-type"}: ${text.slice(0, 300)}`,
    );
  }

  return JSON.parse(text) as T;
}

export async function fetchCurrentWorkspaceDay(
  token?: string | null,
): Promise<WorkspaceCurrentDay> {
  const response = await fetch(`${API_BASE_URL}/api/workspace/current-day`, {
    method: "GET",
    headers: buildHeaders(token, false),
  });

  return parseJson<WorkspaceCurrentDay>(response);
}

export async function fetchWorkspaceSync(
  token?: string | null,
): Promise<WorkspaceSyncResponse> {
  const response = await fetch(`${API_BASE_URL}/api/workspace/sync`, {
    method: "GET",
    headers: buildHeaders(token, false),
  });

  return parseJson<WorkspaceSyncResponse>(response);
}

export async function postWorkspaceSyncAction(
  payload: WorkspaceSyncActionRequest,
  token?: string | null,
): Promise<WorkspaceSyncResponse> {
  const response = await fetch(`${API_BASE_URL}/api/workspace/sync`, {
    method: "POST",
    headers: buildHeaders(token, true),
    body: JSON.stringify(payload),
  });

  return parseJson<WorkspaceSyncResponse>(response);
}

export async function runWorkspaceCode(
  payload: WorkspaceRunRequest,
  token?: string | null,
): Promise<WorkspaceRunResponse> {
  const response = await fetch(`${API_BASE_URL}/api/workspace/run`, {
    method: "POST",
    headers: buildHeaders(token, true),
    body: JSON.stringify(payload),
  });

  return parseJson<WorkspaceRunResponse>(response);
}

export async function submitWorkspaceDay(
  payload: WorkspaceSubmitRequest,
  token?: string | null,
): Promise<WorkspaceSubmitResponse> {
  const response = await fetch(`${API_BASE_URL}/api/workspace/submit`, {
    method: "POST",
    headers: buildHeaders(token, true),
    body: JSON.stringify(payload),
  });

  return parseJson<WorkspaceSubmitResponse>(response);
}

export async function logWorkspaceTelemetry(
  payload: WorkspaceTelemetryRequest,
  token?: string | null,
): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE_URL}/api/workspace/telemetry`, {
    method: "POST",
    headers: buildHeaders(token, true),
    body: JSON.stringify(payload),
  });

  return parseJson<{ success: boolean }>(response);
}