import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/home/Home";
import Profilepage from "./components/profilePage/Profilepage";
import CreatorSignUp from "./components/signup/CreatorSignUp";
import VisitorSignUp from "./components/signup/VisitorSignup";
import LandingPage from "./components/landingPage/LandingPage";
import FollowersProfilePage from "./components/followersProfilePage/FollowersProfilePage";
import { useContext } from "react";
import AuthContext from "./contexts/authContext/authContext";
import Search from "./components/search/Search";
import LiveStream from "./components/liveStream/LiveStream";
import ContentUpload from "./components/profilePage/contentUploadModel/ContentUpload";
import FollowersFollowingModels from "./components/shared/followersModel/FollowersFollowingModels";
import AboutUs from "./components/shared/aboutUs/AboutUs";
import Categories from "./components/shared/categories/Categories";
import ContactUs from "./components/shared/contactus/ContactUs";
import TermAndConditionPage from "./components/shared/terms&conditionModel/TermAndConditionPage";
import MessageSection from "./components/shared/messageSection/MessageSection";
import ChatScreen from "./components/chatScreen/ChatScreen";
import SettingsScreen from "./components/settingsPage/SettingsScreen";
import EventPage from "./components/eventPage/EventPage";
import AllEvents from "./components/eventPage/ALlEvents";
import EventDetails from "./components/eventPage/eventDetails";
import LandingScreen from "./components/home/landingScreen/LandingScreen";
import MobileNavigation from "./components/shared/floatingNavbar/MobileNavigation";

const routesWithMobileNavigation = [
  "/landingpage",
  "/profile",
  "/message",
  "/post",
  "/users-profile",
  "/my-events",
  "/all-events",
  "/events/:eventId",
  "/settings",
  "/users-profile/followers-list",
  "/search",
  "/live-stream/:roomId",
];

function App() {
  const { user } = useContext(AuthContext);

  const location = useLocation();

  // Check if the current path matches any of the defined routes
  const shouldShowMobileNavigation = routesWithMobileNavigation.some(
    (route) => {
      // Match dynamic paths like "/events/:eventId" or "/live-stream/:roomId"
      const dynamicRouteRegex = new RegExp(
        `^${route.replace(/:\w+/g, "\\w+")}$`
      );
      return dynamicRouteRegex.test(location.pathname);
    }
  );

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/landingpage" /> : <LandingScreen />}
        />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/creator-signup" element={<CreatorSignUp />} />
        <Route path="/visitor-signup" element={<VisitorSignUp />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/message" element={<MessageSection />} />
        <Route path="/post" element={<ContentUpload />} />
        <Route path="/users-profile" element={<FollowersProfilePage />} />
        <Route path="/my-events" element={<EventPage />} />
        <Route path="/all-events" element={<AllEvents />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route
          path="/users-profile/followers-list"
          element={<FollowersFollowingModels />}
        />
        <Route path="/search" element={<Search />} />
        <Route path="/live-stream/:roomId" element={<LiveStream />} />
        <Route path="/ChatScreen" element={<ChatScreen />} />
        {/* Footers---Links */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/term-conditions" element={<TermAndConditionPage />} />
      </Routes>
      {/* Render MobileNavigation only for specific routes */}
      {shouldShowMobileNavigation && <MobileNavigation />}
    </>
  );
}

export default App;
