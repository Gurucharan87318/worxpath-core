import { useCallback } from "react";
import {
  logWorkspaceTelemetry,
  runWorkspaceCode,
  submitWorkspaceDay,
} from "../lib/workspace-api";
import { useWorkspaceStore } from "../store/useWorkspaceStore";

export function useWorkspaceActions() {
  const currentDayData = useWorkspaceStore((state) => state.currentDayData);
  const draftCode = useWorkspaceStore((state) => state.draftCode);
  const setExecutionResult = useWorkspaceStore((state) => state.setExecutionResult);
  const setValidationResult = useWorkspaceStore((state) => state.setValidationResult);
  const setSubmitting = useWorkspaceStore((state) => state.setSubmitting);

  const runCode = useCallback(async () => {
    if (!currentDayData) return;

    const result = await runWorkspaceCode({
      day: currentDayData.currentDay,
      language: currentDayData.language,
      code: draftCode,
    });

    setExecutionResult(result.executionResult);
    setValidationResult(result.validationResult);

    await logWorkspaceTelemetry({
      day: currentDayData.currentDay,
      eventType:
        result.executionResult.status === "error"
          ? "RUN_ERROR"
          : result.executionResult.warningMessage
            ? "RUN_WARNING"
            : "RUN_CODE",
      metadata: {
        rowCount: result.executionResult.rowCount ?? 0,
        executionTimeMs: result.executionResult.executionTimeMs ?? null,
      },
    });
  }, [
    currentDayData,
    draftCode,
    setExecutionResult,
    setValidationResult,
    setSubmitting,
  ]);

  const submitDay = useCallback(async () => {
    if (!currentDayData) return;

    try {
      setSubmitting(true);

      const result = await submitWorkspaceDay({
        day: currentDayData.currentDay,
        code: draftCode,
      });

      await logWorkspaceTelemetry({
        day: currentDayData.currentDay,
        eventType: result.success ? "SUBMIT_SUCCESS" : "SUBMIT_FAIL",
        metadata: {
          nextDay: result.nextDay ?? null,
          message: result.message,
        },
      });

      return result;
    } finally {
      setSubmitting(false);
    }
  }, [currentDayData, draftCode, setSubmitting]);

  return {
    runCode,
    submitDay,
  };
}