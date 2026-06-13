import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Brain,
  CalendarDays,
  FileText,
  Lightbulb,
  Send,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  TrendingUp,
} from "lucide-react";
import AppShell from "../components/layout/AppShell";
import { ROUTES } from "../lib/navigation";
import { cn } from "../lib/utils";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
  meta?: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    role: "assistant",
    content:
      "You are on track. Your strongest momentum is in daily execution, but your evidence layer is still thin. Today, finish one practical task and push one visible artifact.",
    meta: "Daily guidance",
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "Recommended next move: complete the SQL practice block, then add the output to your evidence graph.",
    meta: "Next-step recommendation",
  },
];

const QUICK_ACTIONS = [
  {
    label: "What should I do today?",
    prompt: "What should I do today to make the most progress?",
    icon: CalendarDays,
  },
  {
    label: "Analyze my progress",
    prompt: "Analyze my current progress and tell me where I am falling behind.",
    icon: TrendingUp,
  },
  {
    label: "Give me a recovery plan",
    prompt: "I lost momentum. Give me a short recovery plan for the next 3 days.",
    icon: ShieldCheck,
  },
  {
    label: "Help me build evidence",
    prompt: "How do I turn today's work into evidence for recruiters?",
    icon: FileText,
  },
];

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">{children}</div>;
}

function WoraStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-[20px] border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <div className="mt-3 text-2xl font-bold tracking-[-0.04em] text-slate-900">
        {value}
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{hint}</p>
    </div>
  );
}

function QuickActionButton({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
    >
      <div className="rounded-xl bg-blue-50 p-2 text-blue-700 shadow-sm">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-sm font-semibold text-slate-900">{label}</span>
    </button>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-2xl rounded-[24px] px-5 py-4 shadow-sm",
          isAssistant
            ? "border border-slate-100 bg-white text-slate-900"
            : "bg-blue-600 text-white"
        )}
      >
        {message.meta && (
          <div
            className={cn(
              "mb-2 text-[11px] font-semibold uppercase tracking-[0.16em]",
              isAssistant ? "text-slate-500" : "text-blue-100"
            )}
          >
            {message.meta}
          </div>
        )}
        <p className="text-[15px] leading-7">{message.content}</p>
      </div>
    </div>
  );
}

export default function WoraPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const assistantStatus = useMemo(() => {
    return {
      readiness: "68%",
      momentum: "Stable",
      nextFocus: "Execution → Evidence",
    };
  }, []);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      meta: "Wora response",
      content:
        "You should focus on one high-completion task today, then convert it into visible proof. The fastest path is: complete your active mission, capture one output, and push it into your evidence layer.",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <AppShell>
      <Container>
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Wora™ AI Coach
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 md:text-4xl">
              Adaptive guidance inside the career transition workflow.
            </h1>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Wora helps users decide what to do next, where momentum is slipping,
              and how to convert progress into recruiter-facing output.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={ROUTES.workspace}
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <SquareTerminal className="mr-2 h-4 w-4" />
              Open Workspace
            </Link>
            <Link
              to={ROUTES.evidence}
              className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <FileText className="mr-2 h-4 w-4" />
              View Evidence
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <WoraStat
            label="Interview Readiness"
            value={assistantStatus.readiness}
            hint="Current estimate based on consistency, completion, and visible proof."
          />
          <WoraStat
            label="Momentum State"
            value={assistantStatus.momentum}
            hint="Your execution rhythm is intact, but output conversion still needs attention."
          />
          <WoraStat
            label="Recommended Focus"
            value={assistantStatus.nextFocus}
            hint="Finish one task, capture one artifact, and strengthen your proof layer."
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-blue-50 p-3 text-blue-700 shadow-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Quick actions</p>
                  <p className="text-xs text-slate-500">Start faster with guided prompts</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {QUICK_ACTIONS.map((action) => (
                  <QuickActionButton
                    key={action.label}
                    label={action.label}
                    icon={action.icon}
                    onClick={() => sendMessage(action.prompt)}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Guidance Areas
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-50 p-2 text-blue-700">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Decision clarity</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Understand what matters most today.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-50 p-2 text-blue-700">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Action prioritization</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Reduce overwhelm and move to the next best task.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-50 p-2 text-blue-700">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Evidence conversion</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Turn work into proof and proof into career assets.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </aside>

          <section className="flex min-h-[720px] flex-col overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-sm font-semibold text-slate-900">Conversation</p>
                <p className="mt-1 text-xs text-slate-500">
                  Ask for direction, recovery, planning, or proof-building help
                </p>
              </div>

              <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Active
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-[#F8F9FA] px-5 py-5">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>

            <div className="border-t border-slate-100 bg-white p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-end gap-3">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={3}
                    placeholder="Ask Wora what to do next, where you are behind, or how to convert work into evidence..."
                    className="min-h-[96px] flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  />
                  <button
                    type="button"
                    onClick={() => sendMessage(input)}
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={ROUTES.repath}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Open RePath™
                  </Link>

                  <Link
                    to={ROUTES.resume}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Open Resume Builder
                  </Link>

                  <Link
                    to={ROUTES.dashboard}
                    className="inline-flex h-10 items-center justify-center text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                  >
                    Back to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </AppShell>
  );
}