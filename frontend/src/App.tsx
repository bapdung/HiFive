import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import BoardPage from "./pages/BoardPage/BoardPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/creator/:creatorId" element={<ProfilePage />} />
        <Route path="/creator/:creatorId/:postId" element={<BoardPage />} />
      </Routes>
    </div>
  );
}

export default App;
