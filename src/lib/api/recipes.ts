import { Recipe } from "@/interfaces/recipe.input";
import { axiosInstance } from "../axios";

export async function postRecipe(input: Recipe) {
	const response = await axiosInstance.post("/recipe", input);
	return await response.data;
}

export async function getRecipes() {
	const response = await axiosInstance.get("/recipe");
	return await response.data;
}

export async function getRecipe(id: number) {
	const response = await axiosInstance.get(`/recipe/${id}`);
	return await response.data;
}

export async function patchRecipe(input: Partial<Recipe>): Promise<Recipe> {
	const response = await axiosInstance.patch(`/recipe/${input.id}`, input);
	return await response.data;
}

export async function deleteRecipe(id: number) {
	const response = await axiosInstance.delete(`/recipe/${id}`);
	await response.data;
	return id;
}
