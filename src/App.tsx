import { BrowserRouter, Route,  Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/loginpage";

export default function  App() {
  return (


      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<LandingPage/>} />
         <Route path = "/login" element = {<LoginPage/>}/>
      </Routes>
      </BrowserRouter>

    </ThemeProvider>
  
  )
}