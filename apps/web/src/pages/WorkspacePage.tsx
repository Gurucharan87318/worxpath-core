import AppShell from "../components/layout/AppShell";
import WorkspaceTopbar from "../components/workspace/WorkspaceTopbar";
import WorkspaceSidebar from "../components/workspace/WorkspaceSidebar";
import DayMissionCard from "../components/workspace/DayMissionCard";
import TaskChecklist from "../components/workspace/TaskChecklist";
import DayNavigationCard from "../components/workspace/DayNavigationCard";
import { useWorkspaceDay } from "../hooks/useWorkspaceDay";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-5 lg:px-6 lg:py-6">
      {children}
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {children}
    </div>
  );
}

export default function WorkspacePage() {
  useWorkspaceDay();

  return (
    <AppShell>
      <div className="min-h-screen bg-slate-50 text-slate-700 antialiased">
        <Container>
          <div className="space-y-4">
            <Panel>
              <WorkspaceTopbar />
            </Panel>

            <div className="grid items-start gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
              <Panel>
                <WorkspaceSidebar />
              </Panel>

              <div className="space-y-4">
                <Panel>
                  <DayMissionCard />
                </Panel>

                <Panel>
                  <TaskChecklist />
                </Panel>

                <Panel>
                  <DayNavigationCard />
                </Panel>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </AppShell>
  );
}