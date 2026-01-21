// app/(store)/builder/page.tsx
import { getBuilderProducts } from "@/app/data/products";
import { BuilderShell } from "@/components/builder/builder-shell";

export default async function BuilderPage() {
	const allBuilderParts = await getBuilderProducts();

	return <BuilderShell allProducts={allBuilderParts} />;
}
