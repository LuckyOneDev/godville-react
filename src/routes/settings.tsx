import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SecretInput } from "@/components/ui/secret-input";
import { useApiToken } from "@/features/api-token/ApiTokenContext";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
	component: ApiKey,
});

function ApiKey() {
	const { token, setToken } = useApiToken();
	const [inputValue, setInputValue] = useState(token ?? "");

	const handleSave = () => {
		setToken(inputValue || null);
	};

	return (
		<div className="p-4">
			<Card>
				<CardHeader>
					<CardTitle>API Key</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="apiKey">Enter your API Key</Label>
						<a
							href="https://godville.net/user/profile"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-muted-foreground hover:underline"
						>
							Link to your Godville profile
						</a>
						<SecretInput
							id="apiKey"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							placeholder="Enter your API key here"
						/>
					</div>
					<Button onClick={handleSave}>Save API Key</Button>
					{token && (
						<Alert>
							<CheckCircle2 className="h-4 w-4" />
							<AlertDescription>API Key is set!</AlertDescription>
						</Alert>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
