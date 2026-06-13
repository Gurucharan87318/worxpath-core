import { create } from "zustand";
import type {
  WorkspaceCurrentDay,
  WorkspaceExecutionResult,
  WorkspaceState,
  WorkspaceSyncResponse,
  WorkspaceValidationResult,
} from "../types/workspace";

const createInitialExecutionResult = (): WorkspaceExecutionResult => ({
  status: "idle",
  outputLines: [],
  errorMessage: null,
  warningMessage: null,
  rows: [],
  rowCount: 0,
  executionTimeMs: null,
});

const createInitialValidationResult = (): WorkspaceValidationResult => ({
  status: "idle",
  message: null,
  checks: [],
});

const initialState = {
  isLoading: true,
  isSavingDraft: false,
  isSubmitting: false,
  isSequenceOpen: false,
  currentDayData: null as WorkspaceCurrentDay | null,
  workspaceSync: null as WorkspaceSyncResponse | null,
  draftCode: "",
  selectedChoiceId: null as string | null,
  financialValues: {} as Record<string, number>,
  lastSavedAt: null as string | null,
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  ...initialState,

  setWorkspaceDay: (payload) =>
    set(() => ({
      currentDayData: payload,
      draftCode: payload.starterCode ?? "",
      selectedChoiceId: null,
      financialValues: Object.fromEntries(
        (payload.financialInputs ?? []).map((item) => [item.key, item.value]),
      ),
      isLoading: false,
      lastSavedAt: null,
    })),

  setWorkspaceSync: (payload) =>
    set(() => ({
      workspaceSync: payload,
    })),

  setLoading: (value) =>
    set(() => ({
      isLoading: value,
    })),

  setSavingDraft: (value) =>
    set(() => ({
      isSavingDraft: value,
    })),

  setSubmitting: (value) =>
    set(() => ({
      isSubmitting: value,
    })),

  setDraftCode: (value) =>
    set(() => ({
      draftCode: value,
    })),

  setSelectedChoiceId: (value) =>
    set(() => ({
      selectedChoiceId: value,
    })),

  setFinancialValue: (key, value) =>
    set((state) => ({
      financialValues: {
        ...state.financialValues,
        [key]: value,
      },
    })),

  setExecutionResult: (value) =>
    set((state) => ({
      currentDayData: state.currentDayData
        ? {
            ...state.currentDayData,
            executionResult: value,
          }
        : state.currentDayData,
    })),

  setValidationResult: (value) =>
    set((state) => ({
      currentDayData: state.currentDayData
        ? {
            ...state.currentDayData,
            validationResult: value,
          }
        : state.currentDayData,
    })),

  setSequenceOpen: (value) =>
    set(() => ({
      isSequenceOpen: value,
    })),

  markTaskComplete: (taskId) =>
    set((state) => {
      if (!state.currentDayData) return state;

      const updatedTasks = state.currentDayData.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task,
      );

      return {
        currentDayData: {
          ...state.currentDayData,
          tasks: updatedTasks,
        },
      };
    }),

  resetWorkspace: () =>
    set(() => ({
      ...initialState,
    })),
}));

export function hydrateWorkspaceDay(payload: WorkspaceCurrentDay) {
  useWorkspaceStore.getState().setWorkspaceDay({
    ...payload,
    executionResult: payload.executionResult ?? createInitialExecutionResult(),
    validationResult: payload.validationResult ?? createInitialValidationResult(),
  });
}

export function hydrateWorkspaceSync(payload: WorkspaceSyncResponse) {
  useWorkspaceStore.getState().setWorkspaceSync(payload);
}

export function resetWorkspaceStore() {
  useWorkspaceStore.getState().resetWorkspace();
}