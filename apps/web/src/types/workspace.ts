// apps/web/src/types/workspace.ts

export interface WorkspaceSyncSequenceItem {
  day: number;
  moduleType: "TECHNICAL" | "RESILIENCE" | "WEALTH";
  state: "archived" | "repath" | "completed" | "current" | "available";
  completed: boolean;
}

export interface WorkspaceCurrentDay {
  currentDay: number;
  totalDays: number;
  moduleType: "TECHNICAL" | "RESILIENCE" | "WEALTH";
  title: string;
  summary: string;
  readingMinutes: number; // 💚 Added
  objective: string;
  xpReward: number;
  streak: number;
  trackName: string;
  squadName: string | null;
  recoveryMode: boolean; // 💚 Added
  repathActive: boolean;
  archivedDays: number[];
  language: "sql" | "python" | "typescript" | "text";
  sequence: WorkspaceSyncSequenceItem[];
  
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    xp: number;
    completed: boolean;
    order: number;
  }>;
  
  starterCode: string;
  solutionCode: string | null;
  executionResult: {
    status: string;
    outputLines: string[];
    errorMessage: string | null;
    warningMessage: string | null;
    rows: any[];
    rowCount: number;
    executionTimeMs: number | null;
  };
  validationResult: {
    status: string;
    message: string | null;
    checks: string[];
  };

  // 💚 Added to support multi-disciplinary tracks natively
  choices: Array<{
    id: string;
    label: string;
    outcome: string;
    reliabilityDelta: number;
    communicationDelta: number;
  }>;

  // 💚 Added to support financial budgeting inputs cleanly
  financialInputs: Array<{
    key: string;
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    prefix: string;
  }>;
  
  woraHints: Array<{
    id: string;
    title: string;
    message: string;
    tone: string;
  }>;
}