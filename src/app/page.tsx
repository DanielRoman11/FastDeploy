"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRecipe } from "@/app/hooks/useRecipe";
import RecipeTable from "@/components/recipe/RecipeTable";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import RecipeItemForm from "@/components/recipe/RecipeItemForm";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";
import { Toaster } from "@/components/ui/toaster";
import RecipeCard from "@/components/recipe/RecipeCard";

export const queryClient = new QueryClient();

export default function Home() {
	const { form, recipes, onSubmit, onDelete } = useRecipe();

	//? INGREDIENTS FORM STATES
	const { fields: fieldsIngredients, append: appendIngredients } =
		useFieldArray({
			control: form.control,
			name: "ingredients",
		});
	function handleClickIngredientItemForm() {
		appendIngredients({ name: "" }, { shouldFocus: false });
	}

	//? TOOLS FORM STATE
	const { fields: fieldsTools, append: appendTools } = useFieldArray({
		control: form.control,
		name: "tools",
	});
	function handleClickToolsItemForm() {
		appendTools({ name: "" }, { shouldFocus: false });
	}

	//? STEPS FORM STATE
	const { fields: fieldsSteps, append: appendSteps } = useFieldArray({
		control: form.control,
		name: "steps",
	});
	function handleClickStepsItemForm() {
		appendSteps({ name: "" }, { shouldFocus: false });
	}

	return (
		<QueryClientProvider client={queryClient}>
			<main>
				<Tabs defaultValue="recipes">
					<TabsList className="w-full flex justify-center items-center mx-auto">
						<TabsTrigger value="recipes">All Recipes</TabsTrigger>
						<TabsTrigger value="recipe_form">Create New Recipe</TabsTrigger>
					</TabsList>
					<TabsContent value="recipes" className="gap-4 grid">
						<RecipeCard recipes={recipes} onDelete={onDelete} />
						<RecipeTable recipes={recipes} />
					</TabsContent>
					<TabsContent value="recipe_form">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								id="recipeForm"
								className="*:my-4 *:mx-2 max-w-2xl mx-auto"
							>
								{/* //* Name, Description and Type */}
								<Card>
									<CardHeader>
										<CardTitle>Recipe Details</CardTitle>
										<CardDescription>
											Write all the details of your recipe.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid gap-6 *:gap-3">
											<FormField
												control={form.control}
												name="name"
												render={({ field }) => (
													<FormItem>
														<FormLabel htmlFor={field.name}>
															What's the name of your recipe?
														</FormLabel>
														<FormControl>
															<Input
																{...field}
																name={field.name}
																id={field.name}
																className="w-full"
																placeholder="Carrot Cake, Sangria, etc... "
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											></FormField>
											<div>
												<FormField
													control={form.control}
													name="type"
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																What's the type of food your recipe is?
															</FormLabel>
															<FormControl>
																<Input
																	{...field}
																	name={field.name}
																	type="text"
																	className="w-full"
																	placeholder="Ex. Dessert, Breakfast, etc..."
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												></FormField>
											</div>
											<div>
												<FormField
													control={form.control}
													name="description"
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																You can add a description, but its not
																mandatory.
															</FormLabel>
															<FormControl>
																<Textarea
																	{...field}
																	name={field.name}
																	className="min-h-32"
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												></FormField>
											</div>
										</div>
									</CardContent>
								</Card>
								{/* //* Preparation and Cooking Time */}
								<Card>
									<CardHeader>
										<CardTitle>Time Preparation</CardTitle>
										<CardDescription>
											Write your times of preparation and cooking for your
											recipe, remember that all time values are mandatory.
										</CardDescription>
										<CardDescription>
											All time entries must use the following scheme HH:MM:SS
										</CardDescription>
									</CardHeader>
									<CardContent className="*:py-4">
										<div>
											<FormField
												control={form.control}
												name="cooking_time"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Cooking Time</FormLabel>
														<FormControl>
															<InputOTP
																maxLength={6}
																className="w-full"
																{...field}
															>
																<p className="text-xs">HH</p>
																<InputOTPGroup>
																	<InputOTPSlot index={0} />
																	<InputOTPSlot index={1} />
																</InputOTPGroup>
																<InputOTPSeparator />
																<p className="text-xs">MM</p>
																<InputOTPGroup>
																	<InputOTPSlot index={2} />
																	<InputOTPSlot index={3} />
																</InputOTPGroup>
																<InputOTPSeparator />
																<p className="text-xs">SS</p>
																<InputOTPGroup>
																	<InputOTPSlot index={4} />
																	<InputOTPSlot index={5} />
																</InputOTPGroup>
															</InputOTP>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											></FormField>
										</div>
										<div>
											<FormField
												control={form.control}
												name="preparation_time"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Preparation Time</FormLabel>
														<FormControl>
															<InputOTP
																maxLength={6}
																className="w-full"
																{...field}
															>
																<p className="text-xs">HH</p>
																<InputOTPGroup className="relative">
																	<InputOTPSlot index={0} />
																	<InputOTPSlot index={1} />
																</InputOTPGroup>
																<InputOTPSeparator />
																<p className="text-xs">MM</p>
																<InputOTPGroup>
																	<InputOTPSlot index={2} />
																	<InputOTPSlot index={3} />
																</InputOTPGroup>
																<InputOTPSeparator />
																<p className="text-xs">SS</p>
																<InputOTPGroup>
																	<InputOTPSlot index={4} />
																	<InputOTPSlot index={5} />
																</InputOTPGroup>
															</InputOTP>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</CardContent>
								</Card>
								{/* //* Ingredients, Tools, Steps */}
								<Card>
									<CardHeader>
										<CardTitle>Content Index</CardTitle>
										<CardDescription>
											Here is where you wirte the content of your recipe,
											writing all the ingredients, tools and steps to follow for
											users to create your recipe.
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										{/* //*: INGREDIENTS FORM */}
										<section>
											<CardTitle className="text-lg">Ingredients</CardTitle>
											<CardDescription className="pt-1">
												Select all the ingredients you need.
											</CardDescription>
											<RecipeItemForm
												label="Ingredients"
												form={form}
												handleClickItemForm={handleClickIngredientItemForm}
												rows={fieldsIngredients}
											/>
										</section>
										{/* //*: TOOLS FORM */}
										<section>
											<CardTitle className="text-lg">Tools</CardTitle>
											<CardDescription className="pt-1">
												Select all the tools you need.
											</CardDescription>
											<RecipeItemForm
												label="Tools"
												form={form}
												handleClickItemForm={handleClickToolsItemForm}
												rows={fieldsTools}
											/>
										</section>
										{/* //*: STEPS FORM */}
										<section>
											<CardTitle className="text-lg">Steps</CardTitle>
											<CardDescription className="pt-1">
												Select all the steps you need.
											</CardDescription>
											<RecipeItemForm
												label="Steps"
												form={form}
												handleClickItemForm={handleClickStepsItemForm}
												rows={fieldsSteps}
											/>
										</section>
									</CardContent>
								</Card>
								{/* //* Calories, Stimated Price, Rating */}
								<Card>
									<CardHeader>
										<CardTitle>Information</CardTitle>
										<CardDescription>
											Write some relevant information about your recipe.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Calories</TableHead>
													<TableHead>Stimated Price</TableHead>
													<TableHead>Rating</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												<TableRow>
													<TableCell>
														<FormField
															control={form.control}
															name="calories"
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Input
																			{...field}
																			id={field.name}
																			type="text"
																			className="w-full"
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														></FormField>
													</TableCell>
													<TableCell>
														<FormField
															control={form.control}
															name="stimated_price"
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Input
																			{...field}
																			id={field.name}
																			type="text"
																			className="w-full"
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														></FormField>
													</TableCell>
													<TableCell>
														<FormField
															control={form.control}
															name="rating"
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Input
																			{...field}
																			id="rating"
																			type="number"
																			className="w-full"
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														></FormField>
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</CardContent>
								</Card>
								{/* //* Image */}
								<Card>
									<CardHeader>
										<CardTitle>Image</CardTitle>
										<CardDescription>
											The image is not mandatory, but you can always paste some
											URL where you have the image.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<Label htmlFor="image">
											What's the image of your recipe?
										</Label>
										<FormField
											control={form.control}
											name="image"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															{...field}
															id="image"
															type="text"
															className="w-full"
															placeholder="https://image-example.com"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										></FormField>
									</CardContent>
								</Card>
								<div className="flex justify-center">
									<Button type="submit">Submit</Button>
								</div>
							</form>
						</Form>
					</TabsContent>
				</Tabs>
			</main>
			<Toaster />
		</QueryClientProvider>
	);
}
