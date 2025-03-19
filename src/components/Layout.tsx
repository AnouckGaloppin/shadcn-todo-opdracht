import ModeToggle from "./mode-toggle";
import { Toaster } from "@/components/ui/sonner";

const Layout = () => {
  return (
    <div className="flex justify-between">
      <h1>Todo App</h1>
      <button>
        <ModeToggle />
        <Toaster />
      </button>
    </div>
  );
};
export default Layout;
