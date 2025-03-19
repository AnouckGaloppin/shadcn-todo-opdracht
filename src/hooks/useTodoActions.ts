import { useAddTodoMutation, useRemoveTodoMutation } from "@/store/todosApi";
import { toast } from "sonner";
import { useState } from "react";

export const useTodoActions = () => {
  const [addTodo] = useAddTodoMutation();
  const [removeTodo] = useRemoveTodoMutation();
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
    console.log("Deleting todo with ID: ", id);
    if (!id) {
      console.log("id not found");
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

  return {
    todo,
    setText,
    category,
    setCategory,
    handleAddTodo,
    handleRemoveTodo,
  };
};
