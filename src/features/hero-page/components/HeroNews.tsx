import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { queryTime, useHero } from "@/features/hero-page/hooks/useHero";
import { useEffect, useState } from "react";

interface HeroNewsHeaderProps {
	news_h: string;
}

export function HeroNewsHeader(props: HeroNewsHeaderProps) {
	const { dataUpdatedAt } = useHero();

	const getProgress = () => {
		const now = Date.now();
		const timeSinceLastFetch = now - dataUpdatedAt;
		const progress = (timeSinceLastFetch / queryTime) * 100;
		return Math.min(progress, 100);
	};

	const [progress, setProgress] = useState(getProgress());

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress(getProgress());
		}, 1000);
		return () => clearInterval(interval);
	}, [dataUpdatedAt]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{props.news_h}</CardTitle>
			</CardHeader>
			<CardContent>
				<Progress value={progress} />
			</CardContent>
		</Card>
	);
}
