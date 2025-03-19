import { useGetTodosQuery } from "@/store/todosApi";

const Stats = () => {
  const { data: todos = [] } = useGetTodosQuery();
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const percentageCompleted =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
  return (
    <div className="flex justify-between border-t border-gray-300 p-2 text-gray-400">
      <p>Total: {totalTodos} todos</p>
      <p>Active: {activeTodos} todos</p>
      <p>Completed: {completedTodos} todos</p>
      <p>{percentageCompleted}% completed</p>
    </div>
  );
};
export default Stats;
