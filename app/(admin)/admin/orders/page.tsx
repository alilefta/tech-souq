import { getFilteredOrders, OrderDTO } from "@/app/data/orders"; // Your order fetcher
import { DispatchRow } from "@/components/admin/orders/dispatch-row";
import { DispatchHeader } from "@/components/admin/orders/dispatch-header";
import z from "zod";
import { DispatchSearch } from "@/components/admin/orders/dispatch-search";
import { FilterByNode } from "@/components/admin/orders/filter-by-node";
import { FilterByStatus } from "@/components/admin/orders/filter-by-status";

const ordersParamSchema = z.object({
	query: z.string().optional(),
	node: z.string().optional(),
	status: z.string().optional(),
});

interface PageParams {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DispatchHubPage({ searchParams }: PageParams) {
	const p = await searchParams;
	const { query, node, status } = ordersParamSchema.parse(p);

	const orders: OrderDTO[] = await getFilteredOrders({ query, node, status });

	// const order: OrderDTO = {
	// 	firstName: "Jane",
	// 	lastName: "Doe",
	// 	email: "jane@example.com",
	// 	address: "123 Test St",
	// 	city: "Testville",
	// 	country: "Testland",
	// 	total: Number("499.99") * 2 + Number("10.00"),
	// 	shippingCost: 10.0,
	// 	status: "PAID",
	// 	carrier: "Global Express",
	// 	id: "TEST",
	// 	items: [
	// 		{
	// 			id: 1,
	// 			quantity: 20,
	// 			priceAt_time: 200,
	// 			orderId: "TEST",
	// 			productId: 13,
	// 			product: {
	// 				id: 13,
	// 				name: "Test Product",
	// 			},
	// 		},
	// 	],
	// 	discountId: 1,
	// 	orderNumber: "TEST-T-2",
	// 	createdAt: new Date(),
	// 	trackingNumber: "Tracking-T",
	// };

	//const orders = [order];

	return (
		<div className="space-y-10 max-w-400 mx-auto">
			{/* 1. DISPATCH HUD HEADER */}
			<DispatchHeader activeTransfers={orders.length} systemHealth="99.2%" />

			{/* 2. COMMAND FILTER BAR */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/5 border border-white/5 p-px items-stretch">
				{/* SEARCH TERMINAL */}
				<div className="md:col-span-5 bg-[#0A0E14] border-l">
					<DispatchSearch />
				</div>
				<div className="md:col-span-3 bg-[#0A0E14] border-l border-white/5">
					<FilterByNode />
				</div>
				<div className="md:col-span-2 bg-[#0A0E14] border-l border-white/5">
					<FilterByStatus />
				</div>
				<button className="md:col-span-2 bg-[#1E293B] hover:bg-[#FFB400] hover:text-[#0A0E14] text-[10px] font-black uppercase tracking-[0.2em] transition-all">Sync_Registry</button>
			</div>

			{/* 3. DISPATCH REGISTRY TABLE */}
			<div className="border border-white/5 bg-white/1 overflow-x-auto custom-scrollbar">
				<table className="w-full border-collapse min-w-300">
					<thead>
						<tr className="border-b border-white/5 text-[9px] font-black uppercase text-[#94A3B8] tracking-[0.3em] bg-white/2">
							<th className="p-5 text-left font-black">Manifest_ID</th>
							<th className="p-5 text-left font-black">Recipient_Entity</th>
							<th className="p-5 text-left font-black">Destination_Node</th>
							<th className="p-5 text-left font-black">Unit_Load</th>
							<th className="p-5 text-left font-black">Aging_Metric</th>
							<th className="p-5 text-left font-black">Payload_Value</th>
							<th className="p-5 text-left font-black">Logistics_Protocol</th>
							<th className="p-5 text-left font-black">Logistics_Status</th>
							<th className="p-5 text-right font-black">Authorize</th>
						</tr>
					</thead>
					<tbody className="text-[11px] font-bold text-[#F5F5F0] uppercase tracking-tighter font-mono">
						{orders.map((order) => (
							<DispatchRow key={order.id} order={order} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
