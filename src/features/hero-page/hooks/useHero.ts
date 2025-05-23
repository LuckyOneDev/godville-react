import { useApiToken } from "@/api/ApiTokenContext";
import { axiosClient } from "@/api/axiosClient";
import type { GodvilleDataResponse } from "@/types/GodvilleDataResponse";
import { useQuery } from "@tanstack/react-query";

export const queryTime = 30 * 1000;

export function useHero() {
	const { token } = useApiToken();

	const query = useQuery({
		queryKey: ["hero", token],
		queryFn: async () => {
			const response = await axiosClient.post<GodvilleDataResponse>(
				"/getinfo",
				{
					token,
				},
			);

			if (response.data.status !== "success") {
				throw new Error("Failed to fetch hero info");
			}

			return response.data;
		},
		refetchInterval: queryTime,
		enabled: !!token,
	});

	return query;
}
