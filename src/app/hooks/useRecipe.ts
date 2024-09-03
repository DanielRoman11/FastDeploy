import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteRecipe, getRecipes, postRecipe } from "@/lib/api/recipes";
import { queryClient } from "../page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatTimeString } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Recipe } from "../interfaces/recipe.input";
import { title } from "process";

const formSchema = z.object({
	name: z.string().min(1, { message: "You must provided a name" }),
	description: z.string().optional(),
	cooking_time: z.string().min(6, {
		message: "You must provided a cooking time in HH:MM:SS format.",
	}),
	preparation_time: z.string().min(6, {
		message: "You must provided a preparation time in HH:MM:SS format.",
	}),
	type: z
		.string()
		.min(4, { message: "You must provided a type for the recipe." }),
	ingredients: z.array(
		z.object({
			name: z.string().min(1, "You must provide al least one ingredient."),
		})
	),
	tools: z.array(
		z.object({
			name: z.string().min(1, "You must provide al least one tool."),
		})
	),
	steps: z.array(
		z.object({
			name: z.string().min(1, "You must provide al least one step."),
		})
	),
	calories: z.string().optional(),
	stimated_price: z
		.string()
		.min(1, { message: "You have to insert a stimated price." }),
	rating: z.number().min(1).max(5, "Max value is 5"),
	image: z.string().optional(),
});

export function useRecipe() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
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
			rating: 1,
			image: "",
		},
	});

	const {
		data: recipes,
		error,
		isPending,
	} = useQuery(
		{
			queryKey: ["recipes"],
			queryFn: getRecipes,
		},
		queryClient
	);

	//* POST REQUEST
	const createMutation = useMutation(
		{
			mutationFn: postRecipe,
			onSuccess: (data) => {
				queryClient.setQueryData(["recipes"], (old: Recipe[]) => [
					...old,
					data,
				]);
				toast({
					title: "New Recipe Created.",
					description: "You create a NEW recipe.",
				});
				form.reset();
			},
		},
		queryClient
	);

	function onSubmit(values: z.infer<typeof formSchema>) {
		const cooking_time = formatTimeString(values.cooking_time);
		const preparation_time = formatTimeString(values.preparation_time);

		createMutation.mutate({
			...values,
			description:
				values.description && values.description !== ""
					? values.description
					: undefined,
			calories:
				values.calories && values.calories !== "" ? values.calories : undefined,
			image: values.image && values.image !== "" ? values.image : undefined,
			cooking_time,
			preparation_time,
		});
	}

	//* DELETE REQUEST
	const deleteMutation = useMutation(
		{
			mutationFn: deleteRecipe,
			onSuccess: (id: number) => {
				queryClient.setQueryData(["recipes"], (old: Recipe[]) =>
					old.filter((recipe) => recipe.id !== id)
				);
				toast({
					title: "Recipe Deleted.",
					description: "You just delete a recipe.",
				});
			},
		},
		queryClient
	);

	function onDelete(id: number) {
		deleteMutation.mutate(id);
	}

	return {
		onSubmit,
		onDelete,
		form,
		recipes,
		error,
		createMutation,
	};
}
