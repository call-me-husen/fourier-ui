import useClientReady from "@/hooks/core/use-client-ready";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const isClientReady = useClientReady();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  if (!isClientReady) {
    return (
      <div
          onClick={toggleTheme}
          className="absolute top-6 right-6 z-10 p-3 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <div className="h-5 w-5"></div>
      </div>
    )
  }
  return (
    <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-10 p-3 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}