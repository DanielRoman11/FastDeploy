export interface Recipe {
	id?: number;
	name: string;
	description?: string;
	cooking_time: string;
	preparation_time: string;
	type: string;
	ingredients: Item[];
	tools: Item[];
	steps: Item[];
	calories?: string;
	stimated_price: string;
	rating: number;
	image?: string;
}

export interface Item {
	name: string;
}
