import { useState } from "react";
import todosApi, { useAddTodoMutation } from "@/store/todosApi";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGetCategoriesQuery } from "../store/categoriesApi";

const TodoForm = () => {
  const { data: categories } = useGetCategoriesQuery();

  const [addTodo] = useAddTodoMutation();
  const [todo, setText] = useState("");
  const [category, setCategory] = useState("");

  const handleAddTodo = () => {
    if (!todo.trim()) return;
    console.log(category);
    addTodo({
      text: todo,
      id: "",
      completed: false,
      category,
      description: "",
    });
    setText("");
    setCategory("");
  };
  return (
    <div className="flex gap-2">
      <Input
        type="todo"
        placeholder="Add a new todo..."
        value={todo}
        onChange={(e) => setText(e.target.value)}
      />

      <Select
        onValueChange={(category_id) => setCategory(category_id)}
        value={category}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories ? (
              categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))
            ) : (
              <p>No categories found</p>
            )}
            {/* <SelectItem value="Work">Work</SelectItem>
            <SelectItem value="Personal">Personal</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Learning">Learning</SelectItem>
            <SelectItem value="Shopping">Shopping</SelectItem> */}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={handleAddTodo}>
        <Plus /> Add
      </Button>
    </div>
  );
};
export default TodoForm;
