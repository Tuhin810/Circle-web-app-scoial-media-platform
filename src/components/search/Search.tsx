import { useState, useEffect, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { api } from "../../utils/api";
import { IUser } from "../../@types/interface/user.interface";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext/authContext";
import { demoProfileImage } from "../../constants/dummyContent/DummyExamples";
import FloatingNavbar from "../shared/floatingNavbar/FloatingNavbar";

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
    <div className="fixed inset-0 flex justify-center items-end bg-gray-900 bg-opacity-75 transition-all duration-300 h-screen">
      <div className="w-full h-full bg-gray-900 p-4 rounded-t-lg text-white transition-transform duration-300 transform">
        {/* Search bar */}
        <div className="text-xl text-white font-semibold mb-2">
          Search Users
        </div>
        <div className="flex items-center px-2 py-2 bg-gray-800  border border-gray-900 rounded-lg mb-2">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white flex-1 pl-2 focus:outline-none focus:ring-0 border-none"
          />
          <FiSearch size={20} />
        </div>

        {/* Search Results */}
        <div className="mt-2">
          {isLoading ? (
            <p>Loading...</p>
          ) : results.length > 0 ? (
            <ul>
              {results.map((user) => (
                <li
                  key={user._id}
                  className="border-b border-gray-700 bg-gray-800 px-5 mb-2 rounded-xl border-gray-600 py-2"
                >
                  <div
                    className="flex items-center"
                    onClick={() => handleUserClick(user._id)}
                  >
                    <img
                      src={user.profile_image || demoProfileImage}
                      alt={user.full_name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p>{user.full_name}</p>
                      <p className="text-sm text-gray-400">@{user.user_name}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            searchQuery && <p>No users found</p>
          )}
        </div>
      </div>
      <FloatingNavbar />
    </div>
  );
};

export default Search;
