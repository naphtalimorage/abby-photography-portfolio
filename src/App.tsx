import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import {Toaster} from "sonner";
import { Route, Routes} from "react-router-dom";
import Index from "./pages/Index";
import {NotFound} from "@/pages/NotFound.tsx";
import { ThemeProvider } from "./context/ThemeProvider";
import {Home} from "@/pages/Home.tsx";
import Safari from "./pages/Safari";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Login from "@/pages/admin/Login.tsx";
import AdminDashboard from "@/pages/admin/Admin.tsx";

const App = () => {
  const queryClient  = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  return (
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
              <Toaster
                  position="bottom-right"
                  richColors
                  closeButton={true}
                  duration={2000}
                  toastOptions={{
                    classNames: {
                      toast: "bg-background text-foreground border-border",
                      description: "text-muted-foreground",
                      actionButton: "bg-primary text-primary-foreground hover:bg-primary/90",
                      cancelButton: "bg-muted text-muted-foreground hover:bg-muted/80",
                    },
                  }}
                  visibleToasts={5}
                  expand={true}
              />
              <Routes>
                <Route element={<Index />}>
                  <Route path={"/"} element={<Home />} />
                  <Route path={"/tours"} element={<Safari/>} />
                  <Route path={"/portfolio"} element={<Portfolio/>} />
                  <Route path={"/about"} element={<About/>} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/studio" element={<AdminDashboard />} />
                <Route path={"*"} element={<NotFound/>} />
              </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
  )
}

export default App
