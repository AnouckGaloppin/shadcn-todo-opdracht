import TodoItem from "./Todo";
import { useGetTodosQuery } from "../store/todosApi";
import { useGetCategoriesQuery } from "../store/categoriesApi";
import { Category } from "@/types/categoryType";

const TodoList = () => {
  const { data: todos } = useGetTodosQuery();
  const { data: categories } = useGetCategoriesQuery();

  return (
    <ul className="mt-5 flex flex-col gap-2">
      {todos && categories ? (
        todos.map((todo) => {
          const category: Category | undefined = categories.find(
            (cat) => cat.id === todo.category,
          );
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              category={category || { id: "unknown", name: "unknown" }}
            />
          );
        })
      ) : (
        <p>No todos found</p>
      )}
    </ul>
  );
};

export default TodoList;
