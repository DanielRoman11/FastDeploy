import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@/interfaces/recipe.input";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";

import { PencilIcon, StarIcon, X } from "lucide-react";
import ItemDialog from "./RecipeItemDialog";
import RecipeForm from "./RecipeForm";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export default function RecipeCard({
	recipes,
	form,
	onSubmit,
	onDelete,
}: {
	recipes: Recipe[];
	onDelete: (id: number) => void;
	form: any;
	onSubmit: (values: any) => void;
}) {
	return (
		<>
			<article className="flex flex-wrap gap-4 justify-center items-center">
				{recipes &&
					recipes.map((recipe) => (
						<Card key={recipe.id}>
							<CardHeader className="relative">
								<AlertDialog>
									<AlertDialogTrigger>
										<X className="absolute w-5 top-1 right-2 text-muted-foreground cursor-pointer z-10" />
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you absolutely sure?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently
												delete your account and remove your data from our
												servers.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => {
													recipe.id && onDelete(recipe.id);
												}}
											>
												Continue
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
								<div className="flex justify-between">
									<Badge className="w-fit">{recipe.type}</Badge>
									{recipe.rating && (
										<div className="flex">
											{[...Array(Number(recipe.rating))].map((x, i) => (
												<StarIcon className="text-primary" key={i} />
											))}
										</div>
									)}
								</div>
								<CardTitle className="flex items-center gap-2">
									{recipe.name}{" "}
									<Dialog>
										<DialogTrigger>
											<PencilIcon className="size-3.5 text-muted-foreground cursor-pointer" />
										</DialogTrigger>
										<DialogContent className="h-[32rem] w-fit overflow-y-scroll">
											<DialogHeader>
												<DialogTitle className="font-semibold text-primary text-balance text-sm">
													Editing: "
													<span className="text-xl">{recipe.name}</span>"
												</DialogTitle>
												<DialogDescription className="text-sm text-pretty">
													Personalize your recipes to suit your unique tastes
													and preferences.
												</DialogDescription>
											</DialogHeader>
											<RecipeForm
												form={form}
												onSubmit={onSubmit}
												selectedRecipe={recipe}
											/>
										</DialogContent>
									</Dialog>
								</CardTitle>
								<CardDescription>{recipe.description}</CardDescription>
								<Image
									src={
										recipe.image ??
										"https://img.freepik.com/foto-gratis/vista-superior-ingredientes-alimentarios-huevos_23-2148834752.jpg"
									}
									width={350}
									height={400}
									className="w-full h-44"
									alt={recipe.name}
								></Image>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 *:col-span-1 *:text-muted-foreground *:flex *:flex-col">
									<div className="text-xs">
										Cooking Time
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger className="w-fit">
													<p className="text-primary text-sm">
														{recipe.cooking_time}
													</p>
												</TooltipTrigger>
												<TooltipContent>
													<p className="text-xs">Format in HH:MM:SS</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<div className="text-xs place-self-end">
										Preparation Time
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger className="w-fit">
													<p className="text-primary text-sm">
														{recipe.preparation_time}
													</p>
												</TooltipTrigger>
												<TooltipContent>
													<p className="text-xs">Format in HH:MM:SS</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
								</div>
								<div className="flex flex-nowrap gap-2 mt-7 mb-2 overflow-hidden *:w-full">
									<ItemDialog data={recipe.ingredients} label="Ingredients" />
									<ItemDialog data={recipe.tools} label="Tools" />
									<ItemDialog data={recipe.steps} label="Steps" />
								</div>
								<div className="text-sm">
									Stimated Price
									<span className="text-primary">{` $${recipe.stimated_price}`}</span>
									<p className="text-xs text-muted-foreground">
										All prices are stimated base on users criteria.
									</p>
								</div>
							</CardContent>
						</Card>
					))}
			</article>
		</>
	);
}
