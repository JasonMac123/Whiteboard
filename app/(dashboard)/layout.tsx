import { Sidebar } from "./_components/sidebar";

interface DashbaordLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashbaordLayoutProps) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="pl-[60px] h-full">{children}</div>
    </main>
  );
};

export default DashboardLayout;
