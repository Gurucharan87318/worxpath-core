export default function CareerGPSLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8 lg:py-14">
        {sidebar}
        <main>{children}</main>
      </div>
    </div>
  );
}