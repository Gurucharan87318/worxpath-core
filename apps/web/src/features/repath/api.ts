import { api } from "../../lib/api";
import type { RePathStatusResponse } from "./types";

export async function fetchRePathStatus() {
  const { data } = await api.get<RePathStatusResponse>("/repath/status");
  return data;
}

export async function checkRePath() {
  const { data } = await api.post("/repath/check");
  return data;
}

export async function resolveRePath(resolutionNote?: string) {
  const { data } = await api.post("/repath/resolve", { resolutionNote });
  return data;
}