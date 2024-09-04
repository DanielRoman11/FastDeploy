import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Item } from "@/interfaces/recipe.input"

export default function ItemDialog({ label, data }: { label: string, data: Item[] }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">{label}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md rounded-xl">
				<DialogHeader>
					<DialogTitle>Detail List of {label}</DialogTitle>
					<DialogDescription>
						Here you can see everything you need for the {label?.toLocaleLowerCase()}.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<ol className="mx-auto list-decimal">
						{data && data.map((item, i) => (
							<li key={i} className="">{item.name}</li>
						))}
					</ol>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="default">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
