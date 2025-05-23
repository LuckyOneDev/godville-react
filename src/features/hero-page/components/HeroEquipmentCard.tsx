import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HeroEquipment } from "@/types/HeroEquipment";
import type { HeroEquipmentItem } from "@/types/HeroEquipmentItem";

function EquipmentItem(props: { label: string; item: HeroEquipmentItem }) {
	return (
		<tr>
			<td className="text-muted-foreground py-1 w-24">{props.label}</td>
			<td className="py-1">{props.item.name}</td>
			<td className="py-1 w-16 text-right text-lg font-bold">
				{props.item.level}
			</td>
		</tr>
	);
}

export function HeroEquipmentCard(props: HeroEquipment) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Снаряжение</CardTitle>
			</CardHeader>
			<CardContent>
				<table className="w-full">
					<tbody>
						<EquipmentItem label="Оружие" item={props.weapon} />
						<EquipmentItem label="Щит" item={props.shield} />
						<EquipmentItem label="Голова" item={props.head} />
						<EquipmentItem label="Тело" item={props.body} />
						<EquipmentItem label="Руки" item={props.arms} />
						<EquipmentItem label="Ноги" item={props.legs} />
						<EquipmentItem label="Талисман" item={props.talisman} />
					</tbody>
				</table>
			</CardContent>
		</Card>
	);
}
