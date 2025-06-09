import { useEffect } from "react";
import { Dashboard } from "./Pages/Dashboard";
import { Login } from "./Pages/Login";
import { useNavigate, Route, Routes } from "react-router-dom";
import { Signup } from "./Pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostData } from "./hooks/PostData";
const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else navigate("/login");
    return () => {
      // Optional c
      localStorage.setItem("token", "");
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<PostData />} />
        <Route path="*" element={<div>error page</div>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
