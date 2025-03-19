import { useState } from "react";
import type { Todo } from "@/types/todoType";
import type { Category } from "@/types/categoryType";
import { Pencil, X } from "lucide-react";
import { Button } from "./ui/button";
import { useTodoActions } from "@/hooks/useTodoActions";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

type PropType = {
  todo: Todo;
  category: Category;
  categories: Category[];
};

const categoryColors: Record<string, string> = {
  Work: "bg-blue-200 text-blue-500",
  Personal: "bg-pink-200 text-pink-500",
  Shopping: "bg-green-200 text-green-500",
  Health: "bg-teal-200 text-teal-500",
  Learning: "bg-purple-200 text-purple-500",
  unknown: "bg-gray-200 text-gray-500",
};

const TodoItem = ({ todo, category, categories }: PropType) => {
  const { handleRemoveTodo, handleToggleTodo, handleEditTodo } =
    useTodoActions();

  const [editedText, setEditedText] = useState(todo.text);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    todo.category?.id,
  );
  console.log("Todo category:", todo.category);

  const handleSave = () => {
    handleEditTodo({
      ...todo,
      text: editedText,
      description: editedDescription,
      category: selectedCategory,
    });
  };

  console.log("Categories:", categories);
  console.log("Selected Category:", selectedCategory);
  return (
    <Collapsible>
      <li className="rounded-md border-2 border-gray-300 transition-all">
        <CollapsibleTrigger className="flex w-full flex-col p-2 transition-all hover:bg-gray-100">
          <div className="flex items-center gap-5">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => handleToggleTodo(todo)}
            />
            <p className="mr-auto">{todo.text}</p>
            <p
              className={`rounded-md px-2 font-semibold ${categoryColors[category.name]}`}
            >
              {category.name}
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">
                  <Pencil />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Todo</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <Input
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="border px-2 py-1"
                  />
                  <Textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="border px-2 py-1"
                  />
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {(categories ?? []).map((cat) => (
                          <SelectItem
                            key={String(cat.id)}
                            value={String(cat.id)}
                          >
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={() => handleRemoveTodo(todo.id)} variant="ghost">
              <X />
            </Button>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="border-t border-gray-300 bg-gray-100 p-2">
          <p>{todo.description}</p>
        </CollapsibleContent>
      </li>
    </Collapsible>
  );
};

export default TodoItem;
