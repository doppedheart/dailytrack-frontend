import { Navigation } from "./components/layout/Navigation";
import { CreateNFTView } from "./components/create/CreateNFTView";
import { MarketplaceView } from "./components/marketplace/MarketplaceView";
import { HomePage } from "./components/home/HomePage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardView } from "./components/dashboard/DashboardView";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-dark-900 transition-colors duration-200">
          <Navigation />
          <main className="w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/marketplace"
                element={
                  <div className="max-w-6xl mx-auto px-4 py-8">
                    <MarketplaceView />
                  </div>
                }
              />
              <Route
                path="/create"
                element={
                  <div className="max-w-6xl mx-auto px-4 py-8">
                    <CreateNFTView />
                  </div>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <div className="max-w-6xl mx-auto px-4 py-8">
                    <DashboardView />
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}
