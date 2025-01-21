import { useState, useEffect, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { api } from "../../utils/api";
import { IUser } from "../../@types/interface/user.interface";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext/authContext";
import { demoProfileImage } from "../../constants/dummyContent/DummyExamples";
import FloatingNavbar from "../shared/floatingNavbar/FloatingNavbar";
import { IoReturnUpBack } from "react-icons/io5";
import Loader from "../shared/loader/Loader";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [results, setResults] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim() === "") {
        setResults([]);
        return;
      }
      setIsLoading(true);
      try {
        console.log("Check--->", searchQuery);
        const response = await api.user.searchUserByName({ name: searchQuery });
        if (response) {
          setResults(response);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      searchUsers();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  console.log("Results-->", results);

  const handleUserClick = (userId: string) => {
    if (userId === user?._id) {
      navigate("/profile");
    } else {
      navigate(`/users-profile?user_id=${userId}`);
    }
  };
  return (
    <div className="flex flex-col  bg-black pt-5">
      <div className="flex justify-between space-x-3 px-5">
        <Link
          to={"/"}
          className="flex items-center -ml-2 px-3 py-2 rounded-full backdrop-blur bg-white/10 border border-white/10
                             shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-sm font-medium"
        >
          <IoReturnUpBack
            size={22}
            className="text-[#d8fc5f] font-extrabold mr-1"
          />{" "}
          Back
        </Link>
      </div>
      <div className="text-gray-200 text-4xl w-48 ml-5 my-5">
        What are you looking for?
      </div>

      <div className="w-full h-full bg-black  rounded-t-lg text-white px-2 transition-transform duration-300 transform">
        <div className=" rounded-2xl px-3 pb-4">
          {/* Search bar */}

          <div className="flex items-center px-5 h-12 rounded-full backdrop-blur  bg-[#181818] border border-white/10 shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform text-gray-200">
            <input
              type="text"
              placeholder="Type something.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white flex-1 pl-2 focus:outline-none focus:ring-0 border-none"
            />
            <FiSearch size={22} className="text-[#d8fc5f]" />
          </div>
        </div>

        {/* Search Results */}
        <div className="mt-2">
          {isLoading ? (
            <Loader />
          ) : results.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 overflow-y-scroll hidescroll">
                {results.map((user) => (
                  <div
                    key={user._id}
                    className="mb-4 rounded-xl overflow-hidden "
                    onClick={() => handleUserClick(user._id)}
                  >
                    <div className="relative h-56 w-full">
                      {/* Background Image */}
                      <img
                        src={user.profile_image || demoProfileImage}
                        alt={user.full_name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

                      {/* User Name */}
                      <div className="absolute bottom-0 left-0 w-full px-4 py-2 bg-gradient-to-t from-black/50 to-transparent">
                        <p className="text-white font-bold">{user.full_name}</p>
                        <p className="text-sm text-gray-300">
                          @{user.user_name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            searchQuery && <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
