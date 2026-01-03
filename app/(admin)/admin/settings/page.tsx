import { SettingsForm } from "@/components/admin/settings/settings-form";
import { Settings } from "lucide-react";

export default async function FoundrySettingsPage() {
	// In production: const settings = await prisma.settings.findFirst();
	return (
		<div className="max-w-6xl mx-auto space-y-10">
			<header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
				<div>
					<div className="flex items-center gap-3 mb-4">
						<Settings size={14} className="text-[#FFB400]" />
						<span className="text-[#FFB400] text-[10px] font-black uppercase tracking-[0.5em]">Kernel_Configuration: Active</span>
					</div>
					<h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-[#F5F5F0]">
						Foundry <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB400] to-[#FF8C00]">Settings</span>
					</h1>
				</div>
				<div className="flex items-center gap-4 text-[#94A3B8] text-[9px] font-mono border border-white/5 px-4 py-2 bg-white/1">VERSION: BBL_CORE_v60.0.4</div>
			</header>

			<SettingsForm />
		</div>
	);
}
