import type { JSX } from "react";

export function MessageWithLinks(props: { message: string; links: string[] }) {
	const wikiUrl = "https://wiki.godville.net/";
	const elements: JSX.Element[] = [];
	const matches: { link: string; match: number }[] = [];

	for (const link of props.links) {
		const match = props.message.indexOf(link);
		if (match !== -1) {
			matches.push({ link, match });
		}
	}

	matches.sort((a, b) => a.match - b.match);

	let lastIndex = 0;

	for (const { link, match } of matches) {
		// Add text before the link
		if (match > lastIndex) {
			elements.push(
				<span key={lastIndex}>{props.message.slice(lastIndex, match)}</span>,
			);
		}

		// Add the link
		elements.push(
			<a
				key={match}
				href={wikiUrl + link}
				target="_blank"
				rel="noopener noreferrer"
				className="text-blue-500 hover:underline"
			>
				{link}
			</a>,
		);

		lastIndex = match + link.length;
	}

	// Add remaining text after last link
	if (lastIndex < props.message.length) {
		elements.push(
			<span key={lastIndex}>{props.message.slice(lastIndex)}</span>,
		);
	}

	return elements;
}
