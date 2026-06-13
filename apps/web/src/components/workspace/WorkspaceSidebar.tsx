import {
  BookOpen,
  BrainCircuit,
  CircleCheckBig,
  Clock3,
  Database,
  Gem,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { useMemo } from "react";
import { useWorkspaceStore } from "../../store/useWorkspaceStore";

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-1.5">
      <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">
        // {title}
      </p>
      <div className="space-y-1.5">{children}</div>
    </section>
  );
}

function MetaRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-xs">
      <div className="text-slate-400 flex-shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </div>
        <div className="font-mono text-xs font-bold tracking-tight text-slate-800 truncate">
          {value}
        </div>
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  note,
}: {
  label: string;
  value: string | number;
  note: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-xs">
      <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </div>
      <div className="text-xl font-bold tracking-tight text-slate-900 font-mono mt-0.5">
        {value}
      </div>
      <p className="text-[11px] leading-normal text-slate-500 font-sans font-normal mt-0.5">
        {note}
      </p>
    </div>
  );
}

// apps/web/src/components/workspace/WorkspaceSidebar.tsx

export default function WorkspaceSidebar() {
  const { currentDayData } = useWorkspaceStore();

  const completedTasks = useMemo(() => {
    if (!currentDayData) return 0;
    
    // 💚 Type the filter loop element parameter explicitly
    return currentDayData.tasks.filter((task: { completed: boolean }) => task.completed).length;
  }, [currentDayData]);

  if (!currentDayData) {
    return (
      <aside className="space-y-5 p-4 bg-white h-full rounded-xl">
        <div className="h-6 w-24 animate-pulse rounded bg-slate-100" />
        <div className="space-y-2 mt-3">
          <div className="h-10 animate-pulse rounded bg-slate-100" />
          <div className="h-10 animate-pulse rounded bg-slate-100" />
        </div>
      </aside>
    );
  }

  const {
    moduleType,
    readingMinutes,
    objective,
    xpReward,
    trackName,
    recoveryMode,
    repathActive,
    tasks,
    choices,
    financialInputs,
  } = currentDayData;

  const modeMeta =
    moduleType === "TECHNICAL"
      ? {
          icon: <Database className="h-3.5 w-3.5 text-slate-500" />,
          label: "Technical Workspace Focus",
          description: "Read parameters, execute logic vectors, and confirm code alignment outcomes.",
          containerClass: "border-slate-200 bg-slate-50 text-slate-700"
        }
      : moduleType === "RESILIENCE"
        ? {
            icon: <BrainCircuit className="h-3.5 w-3.5 text-slate-500" />,
            label: "Scenario Workspace Focus",
            description: "Assess operational dilemmas using behavioral diagnosis and objective communication templates.",
            containerClass: "border-slate-200 bg-slate-50 text-slate-700"
          }
        : {
            icon: <WalletCards className="h-3.5 w-3.5 text-slate-500" />,
            label: "Wealth Workspace Focus",
            description: "Calibrate baseline economic variables inside a closed personal runway simulation framework.",
            containerClass: "border-slate-200 bg-slate-50 text-slate-700"
          };

  return (
    <aside className="space-y-5 p-4 bg-white h-full rounded-xl">
      
      {/* Configuration Status Mode Row */}
      <SidebarSection title="Operational Frame">
        <div className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 font-mono text-[9px] uppercase font-bold tracking-wider ${modeMeta.containerClass} shadow-xs`}>
          {modeMeta.icon}
          <span>{modeMeta.label}</span>
        </div>

        <p className="text-[11px] leading-relaxed text-slate-500 font-sans font-normal mt-1.5">
          {modeMeta.description}
        </p>

        <div className="mt-3 grid gap-1.5">
          <MetaRow icon={<BookOpen className="h-3.5 w-3.5" />} label="Curriculum Track" value={trackName} />
          <MetaRow icon={<Clock3 className="h-3.5 w-3.5" />} label="Reading Window" value={`${readingMinutes} mins`} />
          <MetaRow icon={<Gem className="h-3.5 w-3.5" />} label="Target Ledger XP" value={`${xpReward} XP`} />
        </div>
      </SidebarSection>

      {/* Target Bounds Mission Parameters Section */}
      <SidebarSection title="Target Bounds">
        <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 shadow-inner">
          <p className="text-xs leading-relaxed text-slate-700 font-mono font-medium">
            {objective}
          </p>
        </div>
      </SidebarSection>

      {/* Numerical Progress Score Indexes Section */}
      <SidebarSection title="Metrics Metrics">
        <div className="grid gap-1.5">
          <StatTile label="Checkpoint Progress" value={`${completedTasks} / ${tasks.length}`} note="Completed sub-task validations inside this roadmap layer tracker window." />
          {choices?.length ? <StatTile label="Branch Configurations" value={choices.length} note="Strategic dialogue choices configured inside this logic branch." /> : null}
          {financialInputs?.length ? <StatTile label="Ledger Modifiers" value={financialInputs.length} note="Dynamic simulation variables unlocked for execution input parameters." /> : null}
        </div>
      </SidebarSection>

      {/* Recovery Condition Intercept Banner Box */}
      {repathActive || recoveryMode ? (
        <SidebarSection title="System Safeguard Alert">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 shadow-sm">
            <div className="flex items-start gap-2.5">
              <div className="rounded bg-slate-100 p-1 text-slate-700 border border-slate-200 mt-0.5">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 uppercase font-mono tracking-tight">RePath™ Compression Active</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 font-sans font-normal">
                  Backlog layers are archived into secondary records storage. Clear this node sequence to reset your consistency ratings index.
                </p>
              </div>
            </div>
          </div>
        </SidebarSection>
      ) : (
        <SidebarSection title="System Target Constraints">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 shadow-sm">
            <div className="flex items-start gap-2.5">
              <div className="rounded bg-slate-100 p-1 text-slate-700 border border-slate-200 mt-0.5">
                <CircleCheckBig className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 uppercase font-mono tracking-tight">Validation Verification Bounds</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 font-sans font-normal">
                  Submit a query string calculation sequence or document your branch decision string to close this path safely.
                </p>
              </div>
            </div>
          </div>
        </SidebarSection>
      )}
    </aside>
  );
}