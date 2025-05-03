import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/service-detail";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "@/components/ui/theme-provider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/studio-kami" component={About} />
      <Route path="/proyek" component={Projects} />
      <Route path="/proyek/:slug" component={ProjectDetail} />
      <Route path="/layanan" component={Services} />
      <Route path="/layanan/:slug" component={ServiceDetail} />
      <Route path="/kontak" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen transition-colors duration-300">
          <NavBar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
