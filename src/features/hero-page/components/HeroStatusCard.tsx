import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface HeroStatusProps {
	name: string;
	motto: string;
	alignment: string;
	level: number;
	exp_progress: number;
	health: number;
	max_health: number;
	gold: number;
	quest: string;
	quest_progress: number;
	quests_completed: number;
}

export function HeroStatusCard(props: HeroStatusProps) {
	return (
		<Card className="h-full w-full">
			<CardContent className="flex flex-col gap-2">
				<HeroStatusItem label="Герой" value={props.name} />
				<HeroStatusItem label="Золото" value={props.gold.toString()} />
				<HeroStatusItem label="Уровень" value={props.level.toString()} />
				<Progress
					value={props.exp_progress}
					indicatorClassName="bg-yellow-500"
				/>
				<HeroStatusItem
					label="Здоровье"
					value={`${props.health} / ${props.max_health}`}
				/>
				<Progress
					value={(props.health * 100) / props.max_health}
					indicatorClassName="bg-red-500"
				/>
				<HeroStatusItem
					label={`Задание (${props.quest_progress}%)`}
					value={props.quest}
				/>
				<Progress
					value={(props.quest_progress * 100) / 100}
					indicatorClassName="bg-blue-500"
				/>
				<HeroStatusItem
					label="Заданий выполнено"
					value={props.quests_completed.toString()}
				/>
			</CardContent>
		</Card>
	);
}

function HeroStatusItem(props: { label: string; value: string }) {
	return (
		<div className="flex flex-row gap-2">
			<div className="text-sm text-muted-foreground my-auto">{props.label}</div>
			<div className="text-lg text-center my-auto ml-auto">{props.value}</div>
		</div>
	);
}
