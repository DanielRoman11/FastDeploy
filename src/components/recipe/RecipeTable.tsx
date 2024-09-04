import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import ItemDialog from "@/components/recipe/RecipeItemDialog";
import Image from "next/image";

import { Recipe } from "@/interfaces/recipe.input";
import { Card, CardContent } from "../ui/card";

export default function RecipeTable({ recipes }: { recipes: any }) {
	return (
		<Card className="max-w-2xl mx-auto">
			<CardContent>
				<Table className="mx-auto mb-10">
					<TableCaption>A list of recent recipes.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Cooking Time</TableHead>
							<TableHead>Preparation Time</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Ingredients</TableHead>
							<TableHead>Tools</TableHead>
							<TableHead>Steps</TableHead>
							<TableHead>Calories</TableHead>
							<TableHead>Stimated Price</TableHead>
							<TableHead>Rating</TableHead>
							<TableHead>Image</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{recipes &&
							recipes.map((recipe: Recipe) => (
								<TableRow key={recipe.id}>
									<TableCell className="font-medium">{recipe.name}</TableCell>
									<TableCell>{recipe.description}</TableCell>
									<TableCell>{recipe.cooking_time}</TableCell>
									<TableCell>{recipe.preparation_time}</TableCell>
									<TableCell>{recipe.type}</TableCell>
									<TableCell>
										<ItemDialog data={recipe.ingredients} label="Ingredients" />
									</TableCell>
									<TableCell>
										<ItemDialog data={recipe.tools} label="Tools" />
									</TableCell>
									<TableCell>
										<ItemDialog data={recipe.steps} label="Steps" />
									</TableCell>
									<TableCell>{recipe.calories}</TableCell>
									<TableCell>{recipe.stimated_price}</TableCell>
									<TableCell>{recipe.rating}</TableCell>
									<TableCell>
										{recipe.image && (
											<Image
												className="size-16 object-contain"
												src={recipe.image}
												alt={recipe.name}
											></Image>
										)}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
