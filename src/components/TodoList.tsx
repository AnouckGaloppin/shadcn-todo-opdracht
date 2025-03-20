import { useState, useEffect } from "react";
import TodoItem from "./Todo";
import { useGetTodosQuery } from "../store/todosApi";
import { useGetCategoriesQuery } from "../store/categoriesApi";
import Pagination from "./Pagination";
import Filter from "./Filter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@/types/categoryType";

const TodoList = () => {
  const { data: todos = [] } = useGetTodosQuery();
  const { data: categories = [] } = useGetCategoriesQuery() as {
    data: Category[];
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [todosPerPage, setTodosPerPage] = useState(5);

  const filteredTodos = todos
    .filter(
      (todo) =>
        !selectedCategory ||
        selectedCategory === "all" ||
        todo.category === selectedCategory,
    )
    .filter((todo) =>
      selectedStatus === "all"
        ? true
        : selectedStatus === "completed"
          ? todo.completed
          : !todo.completed,
    );
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredTodos.length, currentPage, totalPages]);

  const startIndex = (currentPage - 1) * todosPerPage;
  const paginatedTodos = filteredTodos.slice(
    startIndex,
    startIndex + todosPerPage,
  );

  return (
    <>
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <ul className="mt-5 flex flex-col gap-2">
        {paginatedTodos.length > 0 ? (
          paginatedTodos.map((todo) => {
            const category = categories.find(
              (cat) => String(cat.id) === String(todo.category),
            );
            return (
              <TodoItem
                todo={todo}
                category={category ? category : { id: "", name: "", color: "" }}
                categories={categories}
              />
            );
          })
        ) : (
          <p>No todos found</p>
        )}
      </ul>

      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <p>Show:</p>
          <Select
            onValueChange={(value) => setTodosPerPage(Number(value))}
            value={String(todosPerPage)}
          >
            <SelectTrigger className="rounded border px-4 py-2">
              <SelectValue placeholder="Select todos per page">
                {todosPerPage} per page
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[5, 10, 15, 20].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} per page
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TodoList;
