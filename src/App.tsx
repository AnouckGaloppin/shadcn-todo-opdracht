import Layout from "./components/Layout";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ThemeProvider from "@/components/theme-provider";
import Stats from "./components/Stats";
const App = () => {
  return (
    <div className="m-10 flex flex-col gap-5">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout />
        <TodoForm />
        <TodoList />
        <Stats />
      </ThemeProvider>
    </div>
  );
};
export default App;
