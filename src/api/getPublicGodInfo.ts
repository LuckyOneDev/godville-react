import { axiosClient } from "./axiosClient";

interface GodInfo {
	name: string;
	godname: string;
	gender: string;
	level: number;
	max_health: number;
	health: number;
	inventory_max_num: number;
	inventory_num: number;
	motto: string;
	clan: string;
	clan_position: string;
	alignment: string;
	bricks_cnt: number;
	temple_completed_at: string;
	ark_completed_at: string | null;
	arena_won: number;
	arena_lost: number;
	arena_fight: boolean;
	savings: string;
	gold_approx: string;
	quest_progress: number;
	exp_progress: number;
	godpower: number;
	diary_last: string;
	town_name: string;
	distance: number;
	quest: string;
	aura: string;
	activatables: string[];
	pet: {
		pet_name: string;
		pet_class: string;
		pet_level: string;
	};
}

export async function getGodInfo(godname: string, token = "") {
	const response = await axiosClient.get<GodInfo>(`/${godname}/${token}`);
	const godInfo = response.data;
	return godInfo;
}
