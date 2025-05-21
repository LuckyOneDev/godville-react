import { getGodInfo } from "@/api/getPublicGodInfo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

const godInfoQueryOptions = (godname: string) =>
	queryOptions({
		queryKey: ["god-info", godname],
		queryFn: () => getGodInfo(godname, localStorage.getItem("api-token") ?? ""),
	});

export const Route = createFileRoute("/god/$godname")({
	component: GodInfo,
	loader: ({ params, context }) =>
		context.queryClient.ensureQueryData(godInfoQueryOptions(params.godname)),
});

function GodInfo() {
	const godData = useLoaderData({ from: "/god/$godname" });

	// Get initials for avatar
	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((word) => word[0])
			.join("")
			.toUpperCase();
	};

	return (
		<div className="container py-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Main Info Card */}
				<Card className="md:col-span-2">
					<CardHeader className="flex flex-row items-center gap-4">
						<Avatar className="h-16 w-16">
							<AvatarFallback className="bg-primary text-primary-foreground">
								{getInitials(godData.godname)}
							</AvatarFallback>
						</Avatar>
						<div>
							<CardTitle className="text-2xl">{godData.name}</CardTitle>
							<CardDescription>
								Level {godData.level} • {godData.gender} • {godData.alignment}
							</CardDescription>
							{godData.clan && (
								<Badge variant="outline" className="mt-1">
									{godData.clan} ({godData.clan_position})
								</Badge>
							)}
						</div>
					</CardHeader>
					<CardContent>
						{godData.motto && (
							<div className="mb-4 italic text-muted-foreground">
								"{godData.motto}"
							</div>
						)}

						<div className="space-y-3">
							<div>
								<div className="flex justify-between mb-1 text-sm">
									<span>Health</span>
									<span>
										{godData.health}/{godData.max_health}
									</span>
								</div>
								<Progress
									value={(godData.health / godData.max_health) * 100}
									className="h-2"
								/>
							</div>

							<div>
								<div className="flex justify-between mb-1 text-sm">
									<span>Experience</span>
									<span>{godData.exp_progress}%</span>
								</div>
								<Progress value={godData.exp_progress} className="h-2" />
							</div>

							<div>
								<div className="flex justify-between mb-1 text-sm">
									<span>Quest Progress</span>
									<span>{godData.quest_progress}%</span>
								</div>
								<Progress value={godData.quest_progress} className="h-2" />
							</div>

							<div>
								<div className="flex justify-between mb-1 text-sm">
									<span>God Power</span>
									<span>{godData.godpower}%</span>
								</div>
								<Progress value={godData.godpower} className="h-2" />
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Stats Card */}
				<Card>
					<CardHeader>
						<CardTitle>Stats</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="flex justify-between">
							<span className="text-muted-foreground">Gold</span>
							<span>{godData.gold_approx}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">Savings</span>
							<span>{godData.savings}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">Bricks</span>
							<span>{godData.bricks_cnt}</span>
						</div>
						<Separator className="my-2" />
						<div className="flex justify-between">
							<span className="text-muted-foreground">Arena Won</span>
							<span>{godData.arena_won}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">Arena Lost</span>
							<span>{godData.arena_lost}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">Inventory</span>
							<span>
								{godData.inventory_num}/{godData.inventory_max_num}
							</span>
						</div>
					</CardContent>
				</Card>

				{/* Tabs for additional details */}
				<Card className="md:col-span-3">
					<CardHeader>
						<CardTitle>Details</CardTitle>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="quest">
							<TabsList className="mb-4">
								<TabsTrigger value="quest">Quest</TabsTrigger>
								<TabsTrigger value="pet">Pet</TabsTrigger>
								<TabsTrigger value="location">Location</TabsTrigger>
								{godData.activatables?.length > 0 && (
									<TabsTrigger value="items">Items</TabsTrigger>
								)}
							</TabsList>

							<TabsContent value="quest" className="space-y-4">
								<div>
									<h3 className="font-semibold mb-1">Current Quest</h3>
									<p>{godData.quest}</p>
								</div>
								{godData.aura && (
									<div>
										<h3 className="font-semibold mb-1">Aura</h3>
										<Badge>{godData.aura}</Badge>
									</div>
								)}
								<div>
									<h3 className="font-semibold mb-1">Latest Diary Entry</h3>
									<p className="text-muted-foreground">{godData.diary_last}</p>
								</div>
							</TabsContent>

							<TabsContent value="pet">
								{godData.pet ? (
									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="text-muted-foreground">Name</span>
											<span>{godData.pet.pet_name}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Class</span>
											<span>{godData.pet.pet_class}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Level</span>
											<span>{godData.pet.pet_level}</span>
										</div>
									</div>
								) : (
									<p>No pet information available</p>
								)}
							</TabsContent>

							<TabsContent value="location">
								<div className="space-y-2">
									<div className="flex justify-between">
										<span className="text-muted-foreground">Current Town</span>
										<span>{godData.town_name}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Distance</span>
										<span>{godData.distance} milestones</span>
									</div>
								</div>
							</TabsContent>

							{godData.activatables?.length > 0 && (
								<TabsContent value="items">
									<div className="flex flex-wrap gap-2">
										{godData.activatables.map((item) => (
											<Badge key={item} variant="secondary">
												{item}
											</Badge>
										))}
									</div>
								</TabsContent>
							)}
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
