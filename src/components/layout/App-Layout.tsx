import { ModeToggle } from "../mode-toggle";
import { ThemeProvider } from "../theme-provider";

export default function AppLayout() {
    return (
         <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <div>
                <h3>Welcome to Ask to Pro</h3>
                <ModeToggle/>
        
              </div>
            </ThemeProvider>)
}