import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FactionsListPage from "./pages/FactionsListPage";
import FactionDetailPage from "./pages/FactionDetailPage";
import FeedbackPage from "./pages/FeedbackPage";
import SignupPage from "./pages/SignupPage";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/factions" element={<FactionsListPage />} />
        <Route path="/factions/:slug" element={<FactionDetailPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </UserProvider>
  );
}
export default App;
