import Layout from "./components/Layout";
import TodoList from "./components/TodoList";
import ThemeProvider from "@/components/theme-provider";

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout />
        <TodoList />
      </ThemeProvider>
    </div>
  );
};
export default App;
