import {
  useAddTodoMutation,
  useRemoveTodoMutation,
  useToggleTodoMutation,
} from "@/store/todosApi";
import { toast } from "sonner";
import { useState } from "react";
import { Todo } from "@/types/todoType";

export const useTodoActions = () => {
  const [addTodo] = useAddTodoMutation();
  const [removeTodo] = useRemoveTodoMutation();
  const [toggleTodo] = useToggleTodoMutation();
  const [todo, setText] = useState("");
  const [category, setCategory] = useState("");

  const handleAddTodo = () => {
    if (!todo.trim()) return;
    addTodo({
      text: todo,
      id: crypto.randomUUID(),
      completed: false,
      category,
      description: "",
    });
    setText("");
    setCategory("");
    toast.success("Todo added successfully");
  };

  const handleRemoveTodo = async (id: string) => {
    if (!id) {
      toast.error("Todo not found: invalid ID");
      return;
    }
    try {
      await removeTodo(id).unwrap();
      toast.success("Todo removed successfully");
    } catch (error) {
      toast.error("Failed to  remove todo");
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    if (!todo.id) {
      toast.error("Todo not found: invalid ID");
      return;
    }
    try {
      await toggleTodo(todo).unwrap();
      toast.success("Todo toggled successfully");
    } catch (error) {
      toast.error("Failed to toggle todo");
    }
  };

  return {
    todo,
    setText,
    category,
    setCategory,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleTodo,
  };
};
