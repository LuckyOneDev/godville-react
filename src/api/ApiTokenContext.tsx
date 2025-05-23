import { createContext, useContext, useState } from "react";

interface ApiTokenContextType {
	token: string | null;
	setToken: (token: string | null) => void;
}

const ApiTokenContext = createContext<ApiTokenContextType | undefined>(
	undefined,
);

export function ApiTokenProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string | null>(() => {
		return localStorage.getItem("api-token");
	});

	const value = {
		token,
		setToken: (newToken: string | null) => {
			if (newToken) {
				localStorage.setItem("api-token", newToken);
			} else {
				localStorage.removeItem("api-token");
			}
			setToken(newToken);
		},
	};

	return (
		<ApiTokenContext.Provider value={value}>
			{children}
		</ApiTokenContext.Provider>
	);
}

export function useApiToken() {
	const context = useContext(ApiTokenContext);
	if (context === undefined) {
		throw new Error("useApiToken must be used within an ApiTokenProvider");
	}
	return context;
}
