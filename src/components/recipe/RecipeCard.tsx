import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@/app/interfaces/recipe.input";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { PencilIcon, StarIcon, X } from "lucide-react";
import ItemDialog from "./RecipeItemDialog";

export default function RecipeCard({
	recipes,
	onDelete,
}: {
	recipes: Recipe[];
	onDelete: (id: number) => void;
}) {
	const a: number = 5;

	return (
		<>
			<article className="flex justify-center items-center">
				{recipes &&
					recipes.map((recipe) => (
						<Card key={recipe.id}>
							<CardHeader className="relative">
								<X
									onClick={() => {
										recipe.id && onDelete(recipe.id);
									}}
									className="absolute w-5 top-1 right-2 text-muted-foreground cursor-pointer z-10"
								/>
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
									<PencilIcon className="size-3.5 text-muted-foreground cursor-pointer" />
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
