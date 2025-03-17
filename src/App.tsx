import Layout from "./components/Layout";
import ThemeProvider from "@/components/theme-provider";
// import { Layout } from "lucide-react";

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout></Layout>
      </ThemeProvider>
    </div>
  );
};
export default App;
