import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import { publicRoutes } from "./Routes";
import "./index.css";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner"; // Import LoadingSpinner

function UpdateTitle({ setLoading }) {
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Bắt đầu loading khi thay đổi route

    // Kiểm tra xem pathname có bắt đầu với bất kỳ đường dẫn public route nào không
    const currentRoute = publicRoutes.find((route) =>
      location.pathname.startsWith(route.path)
    );

    if (currentRoute) {
      document.title = currentRoute.title || "Default Title";
    } else {
      document.title = "404 - Page Not Found";
    }

    // Kết thúc loading sau một khoảng thời gian ngắn
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [location, setLoading]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div className="h-screen grid grid-rows-[auto_1fr_auto]">
        {/* Header */}
        <Header />

        {/* Nội dung */}
        <main>
          <UpdateTitle setLoading={setLoading} />
          {loading ? (
            <LoadingSpinner /> // Hiển thị spinner khi loading
          ) : (
            <Routes>
              {publicRoutes.map((route, index) => {
                const Component = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<Component />}
                  />
                );
              })}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
