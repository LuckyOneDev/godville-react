import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageWithLinks } from "@/features/hero-page/components/MessageWithLinks";
import { cn } from "@/lib/utils";
import type { HeroDiaryEntry } from "@/types/HeroDiaryEntry";
import * as motion from "motion/react-client";

export function HeroDiary(props: { diary: HeroDiaryEntry[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Дневник</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-72 overflow-y-auto px-2.5 py-0.5">
					<div className="flex flex-col gap-1">
						{props.diary.map((entry) => (
							<DiaryEntry key={entry.time} entry={entry} />
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}

function DiaryEntry(props: { entry: HeroDiaryEntry }) {
	const time = new Date(props.entry.time);
	return (
		<motion.div
			className={cn(
				"flex flex-row gap-4 py-3 px-2 rounded-sm hover:bg-accent transition-colors duration-200",
				{
					"bg-blue-400/25": props.entry.infl,
				},
			)}
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="text-sm text-center text-muted-foreground tracking-tight w-20 shrink-0 border-r border-primary pr-4 flex items-center">
				{time.toLocaleTimeString()}
			</div>
			<div className="text-base">
				<MessageWithLinks
					message={props.entry.msg}
					links={props.entry.m_wiki ? [props.entry.m_wiki] : []}
				/>
			</div>
		</motion.div>
	);
}
