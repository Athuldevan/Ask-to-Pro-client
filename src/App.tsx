import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "sonner";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
