import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import ScrollToTop from "./utils/scrollToTop";

import Navbar from "./components/Navbar/Navbar";
import CreatorNavbar from "./components/Navbar/CreatorNavbar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Footer from "./components/Footer";
import BoardPage from "./pages/BoardPage/BoardPage";
import Mypage from "./pages/Mypage/MyPage";
import TicketPage from "./pages/TicketPage/TicketPage";
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
import ErrorPage from "./pages/ErrorPage";
import Test from "./pages/FanmeetingPage/TestPage";
import FanmeetingWaiting from "./pages/FanmeetingPage/WaitingPage";

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
    <div className="App w-full min-h-screen-with-footer">
      {location.pathname.startsWith("/creator-only") ? (
        <CreatorNavbar />
      ) : (
        <Navbar />
      )}
      <ScrollToTop />
      <main className="relative w-full flex-grow">
        <Routes>
          <Route path="/creator/:creatorId" element={<ProfilePage />} />
          <Route path="/creator/:creatorId/:postId" element={<BoardPage />} />
          <Route path="/mypage/*" element={<Mypage />} />
          <Route path="/ticket" element={<TicketPage />} />
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
            <Route path="/creator-only/:fanmeetingId" element={<Settings />} />
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
          <Route path="/partner" element={<JoinCreator />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/meet-up/:fanmeetingId" element={<Test />} />
          <Route path="/wait" element={<FanmeetingWaiting />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
