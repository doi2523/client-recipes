import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { publicRoutes } from "./Routes";
import "./index.css";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";

// Component để thay đổi title theo route
function UpdateTitle() {
  const location = useLocation();

  useEffect(() => {
    const currentRoute = publicRoutes.find((route) => route.path === location.pathname);
    if (currentRoute) {
      document.title = currentRoute.title || "Default Title";
    } else {
      document.title = "404 - Page Not Found";
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="h-screen grid grid-rows-[auto_1fr_auto]">
        {/* Header */}
        <Header />

        {/* Nội dung */}
        <main className="mt-16">
          <UpdateTitle />
          <Routes>
            {publicRoutes.map((route, index) => {
              const Component = route.component;
              return <Route key={index} path={route.path} element={<Component />} />;
            })}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
