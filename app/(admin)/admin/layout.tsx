// app/admin/layout.tsx
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen bg-[#0A0E14] text-[#F5F5F0] selection:bg-[#FFB400] selection:text-[#0A0E14] font-sans">
			{/* 1. COMMAND SIDEBAR */}
			<Sidebar />

			<div className="flex-1 flex flex-col min-w-0">
				{/* 2. GLOBAL STATUS BAR */}
				<AdminHeader />

				{/* 3. WORKSPACE AREA */}
				<main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar">{children}</main>
			</div>
		</div>
	);
}
