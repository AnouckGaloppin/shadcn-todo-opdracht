import ModeToggle from "./mode-toggle";

const Layout = () => {
  return (
    <div className="flex justify-between">
      <h1>Todo App</h1>
      <button>
        <ModeToggle />
      </button>
    </div>
  );
};
export default Layout;
