import { OrderDTO } from "@/app/data/orders"; // Or your Prisma type

export function InvoiceTemplate({ order }: { order: OrderDTO }) {
	return (
		<div className="hidden print:block p-8 font-mono text-black bg-white w-full max-w-[210mm] mx-auto">
			{/* HEADER */}
			<div className="flex justify-between items-start border-b-2 border-black pb-8 mb-8">
				<div>
					<h1 className="text-4xl font-black uppercase tracking-tighter">BASE 60</h1>
					<p className="text-xs mt-1">GLOBAL_HARDWARE_FOUNDRY</p>
					<p className="text-xs">NODE: BABYLON_ALPHA_01</p>
				</div>
				<div className="text-right">
					<h2 className="text-xl font-bold uppercase">Official_Manifest</h2>
					<p className="text-sm">#{order.orderNumber}</p>
					<p className="text-xs mt-2">{new Date(order.createdAt).toLocaleDateString()}</p>
				</div>
			</div>

			{/* LOGISTICS DATA */}
			<div className="grid grid-cols-2 gap-8 mb-12">
				<div>
					<h3 className="text-xs font-black uppercase border-b border-black mb-2">Recipient_Node</h3>
					<p className="text-sm font-bold">
						{order.firstName} {order.lastName}
					</p>
					<p className="text-xs">{order.address}</p>
					<p className="text-xs">
						{order.city}, {order.country}
					</p>
					<p className="text-xs">{order.zipCode}</p>
				</div>
				<div>
					<h3 className="text-xs font-black uppercase border-b border-black mb-2">Transfer_Protocol</h3>
					<p className="text-xs">Carrier: Global_Express_BBL</p>
					<p className="text-xs">Status: CAPITAL_VERIFIED</p>
					<p className="text-xs">Payment: STRIPE_SECURE</p>
				</div>
			</div>

			{/* INVENTORY TABLE */}
			<table className="w-full mb-12 text-left">
				<thead>
					<tr className="border-b-2 border-black text-xs uppercase">
						<th className="py-2">Item_Description</th>
						<th className="py-2 text-right">Qty</th>
						<th className="py-2 text-right">Unit_Val</th>
						<th className="py-2 text-right">Total</th>
					</tr>
				</thead>
				<tbody className="text-sm">
					{order.items.map((item) => (
						<tr key={item.id} className="border-b border-gray-300">
							<td className="py-4">
								<span className="block font-bold">{item.product.name}</span>
								<span className="text-xs opacity-60">SKU: {item.product.sku || "N/A"}</span>
							</td>
							<td className="py-4 text-right">{item.quantity}</td>
							<td className="py-4 text-right">${Number(item.priceAt_time).toLocaleString()}</td>
							<td className="py-4 text-right font-bold">${(Number(item.priceAt_time) * item.quantity).toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* FOOTER TOTALS */}
			<div className="flex justify-end">
				<div className="w-1/2 space-y-2">
					<div className="flex justify-between text-xs">
						<span>SUBTOTAL</span>
						<span>${Number(order.total).toLocaleString()}</span>
					</div>
					<div className="flex justify-between text-xs">
						<span>TRANSFER_FEE</span>
						<span>$0.00</span>
					</div>
					<div className="flex justify-between text-xl font-black border-t-2 border-black pt-2 mt-2">
						<span>AUTHORIZATION_VALUE</span>
						<span>${Number(order.total).toLocaleString()}</span>
					</div>
				</div>
			</div>

			{/* SIGNATURE */}
			<div className="mt-20 pt-8 border-t border-black flex justify-between items-center">
				<p className="text-[10px] uppercase">Authorized_By: SYSTEM_OVERSEER</p>
				{/* Fake Barcode representation */}
				<div className="h-8 w-48 bg-[url('/barcode-pattern.png')] bg-repeat-x bg-contain opacity-50 flex items-center justify-center border border-black">
					<span className="bg-white px-2 text-[10px] tracking-widest">{order.orderNumber}</span>
				</div>
			</div>
		</div>
	);
}
