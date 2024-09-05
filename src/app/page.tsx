"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRecipe } from "@/hooks/useRecipe";
import { Toaster } from "@/components/ui/toaster";
import RecipeCard from "@/components/recipe/RecipeCard";
import RecipeForm from "@/components/recipe/RecipeForm";

export const queryClient = new QueryClient();

export default function Home() {
	const {
		form,
		recipes,
		openDialog,
		selRecipe,
		onSubmit,
		onDelete,
		handleOpenDialog,
	} = useRecipe();
	return (
		<QueryClientProvider client={queryClient}>
			<main>
				<Tabs defaultValue="recipes">
					<TabsList className="w-full flex justify-center items-center mx-auto">
						<TabsTrigger value="recipes">All Recipes</TabsTrigger>
						<TabsTrigger value="recipe_form">Create New Recipe</TabsTrigger>
					</TabsList>
					<TabsContent value="recipes">
						<RecipeCard
							recipes={recipes}
							onDelete={onDelete}
							form={form}
							selRecipe={selRecipe}
							onSubmit={onSubmit}
							openDialog={openDialog}
							handleOpenDialog={handleOpenDialog}
						/>
					</TabsContent>
					<TabsContent value="recipe_form" className="overflow-hidden">
						<RecipeForm form={form} onSubmit={onSubmit} />
					</TabsContent>
				</Tabs>
				<Toaster />
			</main>
		</QueryClientProvider>
	);
}
