import type { Todo } from "@/types/todoType";
import type { Category } from "@/types/categoryType";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useTodoActions } from "@/hooks/useTodoActions";

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
  return (
    <li className="flex gap-5 rounded-md border-2 border-solid border-gray-300 p-2">
      <p className="mr-auto w-100">{todo.text}</p>
      <p
        className={`rounded-md pr-2 pl-2 font-semibold ${categoryColors[category.name]}`}
      >
        {category.name}
      </p>
      <Pencil />
      <Button onClick={() => handleRemoveTodo(todo.id)}>
        <X />
      </Button>
    </li>
  );
};

export default TodoItem;
