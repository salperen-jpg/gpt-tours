import { Navbar } from "@/components";
import { useState, createContext, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

type Theme = "dark" | "light" | "system";

type DashboardContextProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type DashboardContextState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  changeTheme: (theme: Theme) => void;
};

const initialState: DashboardContextState = {
  theme: "system",
  setTheme: () => null,
  changeTheme: () => null,
};

const DashboardContext = createContext(initialState);

const getLocalStorage = (): Theme => {
  const theme = localStorage.getItem("theme");
  if (theme) {
    return theme as Theme;
  }
  // if theme is not there set system variable initially
  return window.matchMedia("(prefers-color-scheme:dark)").matches
    ? "dark"
    : "light";
};

const SharedLayout = () => {
  const [theme, setTheme] = useState<Theme>(getLocalStorage());

  const changeTheme = (theme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme:dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      setTheme(systemTheme);
      localStorage.setItem("theme", systemTheme);
      return;
    }
    setTheme(theme);
    localStorage.setItem("theme", theme);
    root.classList.add(theme);
  };

  useEffect(() => {
    changeTheme(theme);
  }, []);

  return (
    <DashboardContext.Provider value={{ theme, setTheme, changeTheme }}>
      <Navbar />
      <section className="align-element py-20">
        <Outlet />
      </section>
    </DashboardContext.Provider>
  );
};
export default SharedLayout;

export const useDashboardContext = (): DashboardContextState => {
  return useContext(DashboardContext);
};
