import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";

import Navbar from "./components/Navbar/Navbar";
import CreatorNavbar from "./components/Navbar/CreatorNavbar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Footer from "./components/Footer";
import BoardPage from "./pages/BoardPage/BoardPage";
import Mypage from "./pages/Mypage/MyPage";
import TicketList from "./pages/TicketPage/TicketPage.List";
import TicketDetail from "./pages/TicketPage/TicketPage.Detail";
import Question from "./pages/TicketPage/TicketPage.Question";
import StoryForm from "./pages/TicketPage/TicketPage.StoryForm";
import MainPage from "./pages/MainPage/MainPage";
import CreatorList from "./pages/CreatorListPage/CreatorListPage";
import JoinCreator from "./pages/JoinCreatorPage/JoinCreatorPage";
import CreatorOnly from "./pages/CreatorOnly/CreatorOnly.MyFanmeeting";
import CreateFanmeeting from "./pages/CreatorOnly/CreatorOnly.CreateFanmeeting";
import Settings from "./pages/CreatorOnly/CreatorOnly.Settings";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import StoryDetail from "./pages/CreatorOnly/CreatorOnly.Settings.StoryDetail";

function App() {
  const location = useLocation();
  const validateAndGetToken = useAuthStore(
    (state) => state.validateAndGetToken,
  );
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const checkLogin = async () => {
      const localToken = localStorage.getItem("accessToken");

      if (!localToken) {
        const newToken = await validateAndGetToken();
        if (newToken) {
          setAccessToken(newToken);
        }
      } else {
        setAccessToken(localToken);
      }
    };

    checkLogin();
  }, [validateAndGetToken, setAccessToken]);

  return (
    <div className="App">
      {location.pathname.startsWith("/creator-only") ? (
        <CreatorNavbar />
      ) : (
        <Navbar />
      )}
      <main className="relative">
        <Routes>
          <Route path="/creator/:creatorId" element={<ProfilePage />} />
          <Route path="/creator/:creatorId/:postId" element={<BoardPage />} />
          <Route path="/mypage/*" element={<Mypage />} />
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
          <Route element={<ProtectedRoute requiredCreator />}>
            <Route path="/creator-only" element={<CreatorOnly />} />
            <Route path="/creator-only/new" element={<CreateFanmeeting />} />
            <Route
              path="/creator-only/:fanmeetingId/question"
              element={<Settings />}
            />
            <Route
              path="/creator-only/:fanmeetingId/quiz"
              element={<Settings />}
            />
            <Route
              path="/creator-only/:fanmeetingId/story"
              element={<Settings />}
            />
            <Route
              path="/creator-only/:fanmeetingId/story/:storyId"
              element={<StoryDetail />}
            />
          </Route>
          <Route path="/main" element={<MainPage />} />
          <Route path="/creator/list" element={<CreatorList />} />
          <Route path="/parther" element={<JoinCreator />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
