import ModeToggle from "./mode-toggle";
// import ThemeProvider from "./theme-provider";

const Layout = () => {
  return (
    <div className="m-5 flex justify-between">
      <h1>Todo App</h1>
      <button>
        <ModeToggle />
      </button>
    </div>
  );
};
export default Layout;
