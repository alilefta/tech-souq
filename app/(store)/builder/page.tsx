// app/(store)/builder/page.tsx
import { getBuilderProducts } from "@/app/data/products";
import { BuilderShell } from "@/components/builder/builder-shell";
import { CrucibleHUD } from "@/components/builder/crucible-hud";
import { Scene3D } from "@/components/builder/scene-3d";
// import { Scene3D } from "@/components/builder/scene-3d"; // Client component

export default async function BuilderPage() {
	const allBuilderParts = await getBuilderProducts();

	return <BuilderShell allProducts={allBuilderParts} />;
}
