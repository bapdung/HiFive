import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import CreatorNavbar from "./components/Navbar/CreatorNavbar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Footer from "./components/Footer";
import BoardPage from "./pages/BoardPage/BoardPage";
import TicketList from "./pages/TicketPage/TicketPage.List";
import TicketDetail from "./pages/TicketPage/TicketPage.Detail";
import Question from "./pages/TicketPage/TicketPage.Question";
import StoryForm from "./pages/TicketPage/TicketPage.StoryForm";
import CreatorOnly from "./pages/CreatorOnly/CreatorOnly.MyFanmeeting";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname === "/creator-only" ? <CreatorNavbar /> : <Navbar />}
      <main>
        <Routes>
          <Route path="/creator/:creatorId" element={<ProfilePage />} />
          <Route path="/creator/:creatorId/:postId" element={<BoardPage />} />
          <Route path="/ticket" element={<TicketList />} />
          <Route path="/ticket/:fanmeetingId" element={<TicketDetail />} />
          <Route
            path="/fanmeeting/:fanmeetingId/question"
            element={<Question />}
          />
          <Route
            path="/fanmeeting/:fanmeetingId/story"
            element={<StoryForm />}
          />
          <Route path="/creator-only" element={<CreatorOnly />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
