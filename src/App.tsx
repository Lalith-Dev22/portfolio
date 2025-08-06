import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { HomePage } from "./components/HomePage";
import { PortfolioSidebar } from "./components/PortfolioSidebar";
import { MobileNav } from "./components/MobileNav";
import { CodeLoader } from "./components/CodeLoader";
import { ShareButton } from "./components/ShareButton";
import { SkipToContent } from "./components/SkipToContent";
import { ProjectDetail } from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/home" 
        element={
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              {/* Desktop Sidebar */}
              <div className="hidden md:block">
                <PortfolioSidebar />
              </div>
              
              {/* Mobile Navigation */}
              <MobileNav />
              
              <main className="flex-1 relative">
                <HomePage />
              </main>
            </div>
          </SidebarProvider>
        } 
      />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SkipToContent />
        {isLoading && <CodeLoader onComplete={handleLoadingComplete} />}
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<AppContent />} />
          </Routes>
          <ShareButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
