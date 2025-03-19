import {
  useAddTodoMutation,
  useGetTodosQuery,
  useRemoveTodoMutation,
  useToggleTodoMutation,
} from "@/store/todosApi";
import { toast } from "sonner";
import { useState } from "react";
import { Todo } from "@/types/todoType";

export const useTodoActions = () => {
  const { data: todos = [], refetch: handleGetTodos } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [removeTodo] = useRemoveTodoMutation();
  const [toggleTodo] = useToggleTodoMutation();
  const [todo, setText] = useState("");
  const [category, setCategory] = useState("");

  const handleAddTodo = async () => {
    if (!todo.trim()) return;
    try {
      await addTodo({
        text: todo,
        id: crypto.randomUUID(),
        completed: false,
        category,
        description: "",
      }).unwrap();
      setText("");
      setCategory("");
      toast.success("Todo added successfully");
      handleGetTodos();
    } catch (error) {
      toast.error("Failed to add todo");
    }
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
    todos,
    todo,
    setText,
    category,
    setCategory,
    handleGetTodos,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleTodo,
  };
};
