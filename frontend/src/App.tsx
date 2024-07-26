import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Footer from "./components/Footer";
import BoardPage from "./pages/BoardPage/BoardPage";
import Mypage from "./pages/Mypage/MyPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/creator/:creatorId" element={<ProfilePage />} />
          <Route path="/creator/:creatorId/:postId" element={<BoardPage />} />
          <Route path="/mypage/*" element={<Mypage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
