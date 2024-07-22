import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/creator/:creatorId" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
