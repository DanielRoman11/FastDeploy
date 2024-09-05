import {
	InputOTP,
	InputOTPGroup,
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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray } from "react-hook-form";
import { Recipe } from "@/interfaces/recipe.input";
import { useEffect } from "react";

export default function RecipeForm({
	form,
	onSubmit,
	selectedRecipe = null,
}: {
	form: any;
	onSubmit: (values: Recipe, selectedRecipe?: Recipe | null) => void;
	selectedRecipe?: Recipe | null;
}) {
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

	useEffect(() => {
		selectedRecipe
			? form.reset({
					...selectedRecipe,
					cooking_time: selectedRecipe.cooking_time.replaceAll(":", ""),
					preparation_time: selectedRecipe.preparation_time.replaceAll(":", ""),
					description: selectedRecipe.description
						? selectedRecipe.description
						: "",
					calories: selectedRecipe.calories ? selectedRecipe.calories : "",
					image: selectedRecipe.image ? selectedRecipe.image : "",
					rating: selectedRecipe.rating.toString(),
			  })
			: form.reset({
					name: "",
					description: "",
					cooking_time: "",
					preparation_time: "",
					type: "",
					ingredients: [
						{
							name: "",
						},
					],
					tools: [
						{
							name: "",
						},
					],
					steps: [
						{
							name: "",
						},
					],
					calories: "",
					stimated_price: "",
					rating: "1",
					image: "",
			  });
	}, [selectedRecipe]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(() =>
					onSubmit(form.getValues(), selectedRecipe)
				)}
				id="recipeForm"
				className="mx-auto w-[300px] sm:w-auto max-w-xl *:my-4 sm:*:mx-2 *:w-[300px] sm:*:w-auto"
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
						<div className="grid gap-3">
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
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												You can add a description, but its not mandatory.
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
							<div>
								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<p>What's the type of food your recipe is?</p>
											<FormControl>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="outline"
															className="block mx-auto sm:min-w-[300px]"
														>
															{field.value !== "" ? field.value : "Recipe Type"}
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent className="w-56">
														<DropdownMenuLabel>
															Select the type of you recipe.
														</DropdownMenuLabel>
														<DropdownMenuSeparator />
														<DropdownMenuRadioGroup
															value={field.value}
															onValueChange={field.onChange}
														>
															<DropdownMenuRadioItem value="Breakfast">
																Breakfast
															</DropdownMenuRadioItem>
															<DropdownMenuRadioItem value="Lunch">
																Lunch
															</DropdownMenuRadioItem>
															<DropdownMenuRadioItem value="Dinner">
																Dinner
															</DropdownMenuRadioItem>
															<DropdownMenuRadioItem value="Dessert">
																Dessert
															</DropdownMenuRadioItem>
															<DropdownMenuRadioItem value="Drink">
																Drink
															</DropdownMenuRadioItem>
															<DropdownMenuRadioItem value="Snack">
																Snack
															</DropdownMenuRadioItem>
														</DropdownMenuRadioGroup>
													</DropdownMenuContent>
												</DropdownMenu>
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
							Write your times of preparation and cooking for your recipe,
							remember that all time values are mandatory.
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
										<FormLabel>
											Cooking Time
											<p className="text-xs">HH:MM:SS</p>
										</FormLabel>
										<FormControl>
											<InputOTP maxLength={6} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
												</InputOTPGroup>
												<InputOTPGroup>
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
												</InputOTPGroup>
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
										<FormLabel>
											Preparation Time
											<p className="text-xs">HH:MM:SS</p>
										</FormLabel>
										<FormControl>
											<InputOTP maxLength={6} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
												</InputOTPGroup>
												<InputOTPGroup>
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
												</InputOTPGroup>
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
							Here is where you wirte the content of your recipe, writing all
							the ingredients, tools and steps to follow for users to create
							your recipe.
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
							<TableBody className="py-2">
								<TableRow>
									<TableCell>
										<FormField
											control={form.control}
											name="calories"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input {...field} id={field.name} type="text" />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										></FormField>
									</TableCell>
									<TableCell className="relative">
										<FormField
											control={form.control}
											name="stimated_price"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input {...field} id={field.name} type="text" />
													</FormControl>
													<FormMessage className="absolute text-xs" />
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
															min={1}
															max={5}
															pattern="\d*"
															className="min-w-14"
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
							The image is not mandatory, but you can always paste some URL
							where you have the image.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Label htmlFor="image">What's the image of your recipe?</Label>
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
					<Button type="submit">{selectedRecipe ? "Edit" : "Submit"}</Button>
				</div>
			</form>
		</Form>
	);
}
