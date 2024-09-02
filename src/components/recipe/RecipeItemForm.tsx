import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function RecipeItemForm({
	label,
	rows,
	form,
	handleClickItemForm,
}: {
	label: string;
	rows: {}[];
	form: any;
	handleClickItemForm: (form: any) => void;
}) {
	return (
		<>
			<Card>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[150px]">{label}</TableHead>
								<TableHead>Value</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody id="tableContent">
							{rows.map((row, index) => (
								<TableRow key={index}>
									<TableCell className="font-semibold">Name</TableCell>
									<TableCell>
										<FormField
											control={form.control}
											name={`${label}.${index}.name`}
											render={({ field }) => (
												<FormItem>
													<FormLabel htmlFor={`${label}-${index}`} className="sr-only">
														name
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															name={field.name}
															id={`${label}-${index}`}
															type="text"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										></FormField>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className="justify-center border-t p-0 pt-4 bg-secondary py-2">
					<Button
						onClick={() => handleClickItemForm(form)}
						size="lg"
						variant="default"
						className="gap-1"
					>
						<PlusCircle className="size-4" />
						Add Variant
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}
