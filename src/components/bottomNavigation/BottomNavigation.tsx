import { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import AuthContext from "../../contexts/authContext/authContext";
import { useNavigate } from "react-router-dom";
import { demoProfileImage } from "../../constants/dummyContent/DummyExamples";
// import ContentUpload from "../profilePage/contentUploadModel/ContentUpload";
import { CiStreamOn } from "react-icons/ci";
const BottomNavigate = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const userObjectId = user?._id;
  const navigate = useNavigate();

  const handleNavigateProfile = () => {
    navigate(`/profile?user_id=${userObjectId}`);
  };

  const handleNavigateHome = () => {
    navigate("/landingpage");
  };

  const handleOpenModal = () => {
    navigate("/post");
  };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleSearchModel = () => {
    navigate("/search");
  };

  const handleLiveStream = () => {
    navigate("/live-stream");
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full bg-black text-white py-3 shadow-lg z-50 border-r-2">
        <ul className="flex justify-around items-center">
          <li
            className="flex flex-col items-center"
            onClick={handleNavigateHome}
          >
            <CiHome className="text-2xl" />
          </li>

          <li className="flex flex-col items-center">
            <CiSearch className="text-2xl" onClick={handleSearchModel} />
          </li>

          <li className="flex flex-col items-center">
            <CiSquarePlus className="text-2xl" onClick={handleOpenModal} />
          </li>

          <li className="flex flex-col items-center">
            <CiStreamOn className="text-2xl" onClick={handleLiveStream} />
          </li>

          <li
            className="flex flex-col items-center"
            onClick={handleNavigateProfile}
          >
            <img
              src={user.profile_image || demoProfileImage}
              alt="Profile"
              className="rounded-full w-8 h-8 object-cover border border-white"
            />
          </li>
        </ul>
      </nav>
      {/* {isModalOpen && <ContentUpload handleCloseModal={handleCloseModal} />} */}
    </>
  );
};

export default BottomNavigate;
