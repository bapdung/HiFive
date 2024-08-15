import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
import FanmeetingPage from "./pages/FanmeetingPage/Main";
import FanmeetingEndPage from "./pages/FanmeetingPage/EndFanmeeting";

function App() {
  const location = useLocation();
  const validateAndGetToken = useAuthStore(
    (state) => state.validateAndGetToken,
  );
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [isLoading, setIsLoading] = useState(true);

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

      setIsLoading(false);
    };

    checkLogin();
  }, [validateAndGetToken, setAccessToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`App w-full ${
        location.pathname.startsWith("/meet-up") ||
        location.pathname.startsWith("/wait")
          ? "h-full"
          : "min-h-screen-with-footer"
      }`}
    >
      {!location.pathname.startsWith("/meet-up") &&
        !location.pathname.startsWith("/wait") &&
        (location.pathname.startsWith("/creator-only") ? (
          <CreatorNavbar />
        ) : (
          <Navbar />
        ))}

      <ScrollToTop />
      <main className="relative w-full flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/partner" element={<JoinCreator />} />
            <Route path="/creator/list" element={<CreatorList />} />
            <Route path="/creator/:creatorId" element={<ProfilePage />} />

            <Route path="/creator/:creatorId/:postId" element={<BoardPage />} />
            <Route path="/ticket" element={<TicketPage />} />
            <Route path="/ticket/:fanmeetingId" element={<TicketDetail />} />
            <Route path="/mypage/*" element={<Mypage />} />
            <Route
              path="/fanmeeting/:fanmeetingId/question"
              element={<Question />}
            />
            <Route
              path="/fanmeeting/:fanmeetingId/story"
              element={<StoryForm />}
            />
            <Route path="/meet-up/:fanmeetingId" element={<FanmeetingPage />} />
            <Route
              path="/meet-up/:fanmeetingId/result"
              element={<FanmeetingEndPage />}
            />
          </Route>

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

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      {!location.pathname.startsWith("/meet-up") &&
        !location.pathname.startsWith("/wait") && <Footer />}
    </div>
  );
}

export default App;
