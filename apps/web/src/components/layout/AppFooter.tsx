import Container from "./Container";
import Logo from "../common/Logo";

export default function AppFooter() {
  return (
    <footer className="border-t border-[var(--color-divider)] py-12">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Logo />
            <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)]">
              WORXPATH is an employability operating system that combines structured learning,
              behavioral consistency, and career execution into one daily workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">Product</p>
              <div className="mt-4 space-y-3 text-sm text-[var(--color-text-muted)]">
                <p>Career GPS</p>
                <p>Wora AI</p>
                <p>Evidence Graph</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">Framework</p>
              <div className="mt-4 space-y-3 text-sm text-[var(--color-text-muted)]">
                <p>PATH System</p>
                <p>RePath</p>
                <p>Hiring Readiness</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">Use case</p>
              <div className="mt-4 space-y-3 text-sm text-[var(--color-text-muted)]">
                <p>Career transitioners</p>
                <p>Non-IT graduates</p>
                <p>Data Analyst track</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}