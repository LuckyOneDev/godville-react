import { useApiToken } from "@/api/ApiTokenContext";
import { axiosClient } from "@/api/axiosClient";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SecretInput } from "@/components/ui/secret-input";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
	component: ApiKey,
});

function ApiKey() {
	const { token, setToken } = useApiToken();
	const [isLoading, setIsLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const signin = async () => {
		setIsLoading(true);
		const response = await axiosClient.post<{ token: string }>("/signin", {
			username,
			password,
		});
		const token = response.data.token;
		setToken(token);
		setIsLoading(false);
	};

	const handleLogout = () => {
		setToken(null);
	};

	return (
		<div className="p-4 space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>Authentication</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="login">Login</Label>
						<Input
							id="login"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Enter your login here"
						/>
						<Label htmlFor="password">Password</Label>
						<SecretInput
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password here"
						/>
					</div>
					<div className="flex gap-2">
						<Button onClick={signin} disabled={isLoading}>
							Authenticate
						</Button>
						<Button
							onClick={handleLogout}
							variant={"destructive"}
							disabled={!token}
						>
							Logout
						</Button>
					</div>
				</CardContent>
			</Card>
			{token ? (
				<Alert>
					<CheckCircle2 className="h-4 w-4" />
					<AlertDescription>Authenticated!</AlertDescription>
				</Alert>
			) : (
				<Alert>
					<AlertDescription>
						Not authenticated. Please enter your login and password above to
						authenticate.
					</AlertDescription>
				</Alert>
			)}
		</div>
	);
}
