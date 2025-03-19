import type { Todo } from "@/types/todoType";
import type { Category } from "@/types/categoryType";
import { Pencil, X } from "lucide-react";
import { Button } from "./ui/button";
import { useTodoActions } from "@/hooks/useTodoActions";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

type PropType = {
  todo: Todo;
  category: Category;
};

const categoryColors: Record<string, string> = {
  Work: "bg-blue-200 text-blue-500",
  Personal: "bg-pink-200 text-pink-500",
  Shopping: "bg-green-200 text-green-500",
  Health: "bg-teal-200 text-teal-500",
  Learning: "bg-purple-200 text-purple-500",
  unknown: "bg-gray-200 text-gray-500",
};

const TodoItem = ({ todo, category }: PropType) => {
  const { handleRemoveTodo, handleToggleTodo } = useTodoActions();
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
            <Pencil />
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
