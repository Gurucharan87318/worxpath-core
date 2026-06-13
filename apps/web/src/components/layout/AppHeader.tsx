import { UserButton, useUser } from "@clerk/clerk-react";

export default function AppHeader() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-5 lg:px-8">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-900">
            WORXPATH MVP
          </h1>
          <p className="text-xs text-slate-500">
            Structured transition system for interview-ready outcomes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-sm font-medium text-slate-900">
              {user?.fullName ?? "Learner"}
            </div>
            <div className="text-xs text-slate-500">
              {user?.primaryEmailAddress?.emailAddress ?? "Authenticated"}
            </div>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}