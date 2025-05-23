import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { HeroInventory } from "@/types/HeroInventory";
import type { HeroInventoryItem } from "@/types/HeroInventoryItem";

interface HeroInventoryProps {
	inventory: HeroInventory;
	inventory_num: number;
	inventory_max_num: number;
}

export function HeroInventoryCard(props: HeroInventoryProps) {
	const totalPrice = Object.entries(props.inventory).reduce((acc, [, item]) => {
		return acc + item.price * item.cnt;
	}, 0);

	return (
		<Card className="h-full w-full">
			<CardHeader>
				<CardTitle>
					Инвентарь
					<span className="text-muted-foreground ml-2 font-mono">
						{`(${props.inventory_num} / ${props.inventory_max_num})`}
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2 h-full">
				<ScrollArea className="h-full">
					<table className="w-full">
						<thead className="sticky top-0 bg-background">
							<tr className="text-sm font-medium text-muted-foreground">
								<th className="text-left pb-2">Название</th>
								<th className="text-center pb-2 w-24">Цена</th>
								<th className="text-center pb-2 w-24">Кол-во</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(props.inventory).map(([name, item]) => (
								<InventoryItem key={name + item.pos} name={name} item={item} />
							))}
						</tbody>
					</table>
				</ScrollArea>
				<div className="mt-auto text-sm font-medium text-muted-foreground">
					Суммарная стоимость: <b>{totalPrice}</b>
				</div>
			</CardContent>
		</Card>
	);
}

function InventoryItem(props: { name: string; item: HeroInventoryItem }) {
	return (
		<tr className="hover:bg-accent transition-colors">
			<td className="text-sm font-medium capitalize p-2.5 rounded-l-lg">
				{props.name}
			</td>
			<td className="text-sm font-medium text-center p-2.5">
				{props.item.price}
			</td>
			<td className="text-sm font-medium text-center p-2.5 rounded-r-lg">
				{props.item.cnt}
			</td>
		</tr>
	);
}
