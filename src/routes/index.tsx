import { useApiToken } from "@/api/ApiTokenContext";
import { HeroDiary } from "@/features/hero-page/components/HeroDiary";
import { HeroEquipmentCard } from "@/features/hero-page/components/HeroEquipmentCard";
import { HeroInventoryCard } from "@/features/hero-page/components/HeroInventoryCard";
import { HeroNewsHeader } from "@/features/hero-page/components/HeroNews";
import { HeroStatusCard } from "@/features/hero-page/components/HeroStatusCard";
import { useHero } from "@/features/hero-page/hooks/useHero";
import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { token } = useApiToken();
	const { data, isLoading, error } = useHero();

	if (!token) {
		return <Navigate to="/settings" />;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error || !data) {
		return <div>Error: {error?.message}</div>;
	}

	return (
		<div className="container mx-auto py-4 flex flex-col gap-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<HeroStatusCard
					name={data.hero.name}
					motto={data.hero.motto}
					alignment={data.hero.alignment}
					level={data.hero.level}
					exp_progress={data.hero.exp_progress}
					health={data.hero.health}
					max_health={data.hero.max_health}
					gold={data.hero.gold}
					quest={data.hero.quest}
					quest_progress={data.hero.quest_progress}
					quests_completed={data.hero.quests_completed}
				/>
				<HeroInventoryCard
					inventory={data.inventory}
					inventory_num={data.hero.inventory_num}
					inventory_max_num={data.hero.inventory_max_num}
				/>
				<HeroEquipmentCard {...data.equipment} />
			</div>
			<HeroNewsHeader news_h={data.hero.news_h} />
			<div className="grid grid-cols-1 gap-4">
				<HeroDiary diary={data.diary} />
			</div>
		</div>
	);
}
