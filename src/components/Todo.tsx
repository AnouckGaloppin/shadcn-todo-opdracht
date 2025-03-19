import type { Todo } from "@/types/todoType";
import type { Category } from "@/types/categoryType";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useTodoActions } from "@/hooks/useTodoActions";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
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
  const { handleRemoveTodo } = useTodoActions();
  const { handleToggleTodo } = useTodoActions();
  return (
    <li className="flex flex-col rounded-md border-2 border-solid border-gray-300 p-2 transition-all">
      <div className="flex w-full items-center gap-5">
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
        <Button onClick={() => handleRemoveTodo(todo.id)}>
          <X />
        </Button>
        <Collapsible>
          <CollapsibleTrigger className="flex items-center">
            <ChevronDown />
          </CollapsibleTrigger>
          <CollapsibleContent className="w-full border-t border-gray-300 bg-gray-100 p-2 transition-all">
            <p>{todo.description}</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </li>
  );
};

export default TodoItem;
