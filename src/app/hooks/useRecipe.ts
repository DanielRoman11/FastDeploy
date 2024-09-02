import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRecipes, postRecipe } from "@/lib/api/recipes";
import { queryClient } from "../page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
	name: z.string().min(1, { message: "You must provided a name" }),
	description: z
		.string()
		.optional(),
	cooking_time: z.string().min(6, {
		message: "You must provided a cooking time in HH:MM:SS format.",
	}),
	preparation_time: z.string().min(6, {
		message: "You must provided a preparation time in HH:MM:SS format.",
	}),
	type: z.string({ message: "You must provided a type for the recipe." }),
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
	rating: z.string().min(1, { message: "You have to insert a rating." }),
	image: z.string().optional(),
});

export function useRecipe() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "Carrot Cake",
			description: "",
			cooking_time: "000100",
			preparation_time: "010000",
			type: "Dessert",
			ingredients: [
				{
					name: "Carrot",
				},
				{
					name: "Milk",
				},
			],
			tools: [
				{
					name: "Shaker",
				},
				{
					name: "Spoon",
				},
			],
			steps: [
				{
					name: "Cut the carrot in long pieces.",
				},
				{
					name: "Mix the cutted carrots with the milk.",
				},
			],
			calories: "1.0",
			stimated_price: "500.50",
			rating: "3",
			image: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

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

	const createMutation = useMutation(
		{
			mutationFn: postRecipe,
			onSuccess: (data) => {
				queryClient.setQueryData(["recipes"], (old: any) => [...old, data]);
			},
		},
		queryClient
	);

	return {
		onSubmit,
		form,
		recipes,
		error,
		createMutation,
	};
}
