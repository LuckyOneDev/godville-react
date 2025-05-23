import type { HeroEquipmentItem } from "./HeroEquipmentItem";

export interface HeroEquipment {
	weapon: HeroEquipmentItem;
	shield: HeroEquipmentItem;
	head: HeroEquipmentItem;
	body: HeroEquipmentItem;
	arms: HeroEquipmentItem;
	legs: HeroEquipmentItem;
	talisman: HeroEquipmentItem;
}
