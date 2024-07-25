import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Footer from "./components/Footer";
import BoardPage from "./pages/BoardPage/BoardPage";
import TicketList from "./pages/TicketPage/TicketPage.List";
import TicketDetail from "./pages/TicketPage/TicketPage.Detail";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/creator/:creatorId" element={<ProfilePage />} />
          <Route path="/creator/:creatorId/:postId" element={<BoardPage />} />
          <Route path="/ticket" element={<TicketList />} />
          <Route path="/ticket/:fanmeetingId" element={<TicketDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
