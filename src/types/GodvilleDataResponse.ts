import type { GodvilleHero } from "@/types/GodvilleHero";
import type { Gca } from "./Gca";
import type { Gcak } from "./Gcak";
import type { HeroDiaryEntry } from "./HeroDiaryEntry";
import type { HeroEquipment } from "./HeroEquipment";
import type { HeroInventory } from "./HeroInventory";
import type { HeroNewsFromField } from "./HeroNewsFromField";

export interface GodvilleDataResponse {
	status: string;
	hero: GodvilleHero;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	skills: any[];
	inventory: HeroInventory;
	equipment: HeroEquipment;
	ctime: string;
	gca: Gca;
	gcak: Gcak;
	has_pet: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	hints: any[];
	news_from_field: HeroNewsFromField;
	diary: HeroDiaryEntry[];
	gc_mid: number;
	gc_n: string;
	lbp: number;
}
