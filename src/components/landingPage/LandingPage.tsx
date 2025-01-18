import { demoProfileImage } from "../../constants/dummyContent/DummyExamples";
import { AiOutlineMessage } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../contexts/authContext/authContext";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { IUser } from "../../@types/interface/user.interface";

import ContentLandingPage from "./ContentLandingPage";
import FloatingNavbar from "../shared/floatingNavbar/FloatingNavbar";
import GolIveBtn from "../shared/goLiveBtn/GolIveBtn";
import LiveUserBox from "../shared/liveUserBox/LiveUserBox";
import { GrAd } from "react-icons/gr";
import MobileNavigation from "../shared/floatingNavbar/MobileNavigation";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const userObjectId = user?._id;
  const [followers, setFollowers] = useState<IUser[]>([]);
  const [streams, setStreams] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handleProfileView = () => {
    navigate(`/profile?user_id=${userObjectId}`);
  };

  const handleFollowersProfileClick = (followerId: string) => {
    navigate(`/users-profile?user_id=${followerId}`);
  };

  let isFetching = false;

  const fetchingData = async () => {
    if (isFetching || (totalPages && page > totalPages)) return;
    try {
      isFetching = true;
      const filter = {
        page: page,
        sortField: "updatedAt",
        limit: 5,
      };
      const userResponse = await api.user.getUser(filter);
      console.log("User Response--->", userResponse);

      const filteredFollowers = userResponse.result.filter(
        (follower: IUser) => follower._id !== user._id
      );
      setFollowers((prevFollowers) => [...prevFollowers, ...filteredFollowers]);
      const totalResults = userResponse.pagination.total;
      const pageSize = filter.limit;
      setTotalPages(Math.ceil(totalResults / pageSize));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isFetching = false;
    }
  };

  const getLiveStreams = async () => {
    try {
      const filter = {
        room_Id: user?._id,
      };
      const response = await api.livestream.getStreamList(filter);
      console.log("=======>Live streams ", response);
      setStreams(response);
    } catch (error) {}
  };

  useEffect(() => {
    getLiveStreams();
  }, [user]);

  useEffect(() => {
    fetchingData();
  }, [user, page]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = event.currentTarget.scrollLeft;
    const clientWidth = event.currentTarget.clientWidth;
    const scrollWidth = event.currentTarget.scrollWidth;

    if (scrollLeft + clientWidth >= scrollWidth) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const [showNav, setShowNav] = useState<boolean>(true); // To track visibility of the navigation
  const prevScrollY = useRef<number>(0); // To store previous scroll position

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > prevScrollY.current) {
        // Scrolling down, hide the navigation
        setShowNav(false);
      } else {
        // Scrolling up, show the navigation
        setShowNav(true);
      }
      prevScrollY.current = window.scrollY; // Update previous scroll position
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleStreamView = () => {
    navigate(`/live-stream/${user?._id}`);
  };

  return (
    <>
      <div className="flex flex-col bg-black min-h-screen">
        <div className="flex fixed w-full top-0 bg-black z-[50] justify-between  items-center px-4 py-3">
          <h2
            className="text-white text-2xl font-bold ml-2 t font-bold text-2xl leading-tight flex gap-2"
            // style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            <GrAd className="text-[#d8fc5f]" />
            Circle
          </h2>
          <Link to={"/profile"}>
            <img
              src={
                user?.profile_image ||
                "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full  object-cover"
            />
          </Link>
          {/* <div className="flex gap-2">
            <Link to={"/all-events"}>
              <img
                src="https://cdn-icons-png.freepik.com/512/14996/14996864.png?ga=GA1.1.1598467923.1731688846"
                className="h-10 w-10"
                alt=""
              />
            </Link>
            <button onClick={handleMessageClick}>
              <img
                src="https://cdn-icons-png.freepik.com/512/14997/14997032.png"
                className="h-10 w-10"
                alt=""
              />
            </button>
            <button onClick={handleSettingsView}>
              <img
                className="h-10 w-10"
                src="https://cdn-icons-png.freepik.com/512/14996/14996938.png?ga=GA1.1.1598467923.1731688846"
                alt="Settings"
              />
            </button>
          </div> */}
        </div>
        <div className="flex pt-16 mt-2 items-center py-2 pl-2 ">
          <div
            className="flex space-x-4 hidescroll overflow-x-auto scrollbar-hide"
            onScroll={handleScroll}
          >
            {user.role !== "visitor" ? (
              <GolIveBtn onpress={handleStreamView} />
            ) : null}
            {streams.map((stream) => (
              <LiveUserBox stream={stream} />
            ))}
            {followers.map((follower) => (
              <div
                key={follower._id}
                className="flex gap-2 flex-col items-center min-w-max"
                onClick={() => handleFollowersProfileClick(follower._id)}
              >
                <div className="">
                  <img
                    src={follower.profile_image || demoProfileImage}
                    alt="Profile"
                    className="rounded-[1.7rem]  w-16 h-16 border border-gray-900 object-cover"
                  />
                </div>

                <span className="text-xs mt-1 text-gray-200">
                  {follower.user_name.length > 7
                    ? `${follower.user_name.slice(0, 7)}...`
                    : follower.user_name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts section */}
        <ContentLandingPage />
      </div>

      <MobileNavigation />
    </>
  );
};

export default LandingPage;
