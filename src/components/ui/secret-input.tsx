import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function SecretInput({
	className,
	onChange,
	placeholder = "Enter secret value",
	...props
}: React.ComponentProps<"input">) {
	const [showSecret, setShowSecret] = useState(false);

	const toggleSecretVisibility = () => {
		setShowSecret(!showSecret);
	};

	return (
		<div className="relative">
			<Input
				{...props}
				type={showSecret ? "text" : "password"}
				className={cn("pr-10", className)}
			/>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="absolute right-0 top-0 h-full px-3"
				onClick={toggleSecretVisibility}
				aria-label={showSecret ? "Hide secret" : "Show secret"}
			>
				{showSecret ? (
					<EyeOff className="h-4 w-4" />
				) : (
					<Eye className="h-4 w-4" />
				)}
			</Button>
		</div>
	);
}
