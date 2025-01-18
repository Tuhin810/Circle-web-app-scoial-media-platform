import { FollowersMainProfileViewProps } from "../../@types/props/followersDetails.interface.props";

const FollowersMainProfileView: React.FC<FollowersMainProfileViewProps> = ({
  userDetails,
}) => {
  return (
    <>
      <div className="relative">
        <img
          src={
            userDetails?.cover_image ||
            "https://www.acemetrix.com/wp-content/themes/acemetrix/images/default/default-black-banner.png"
          }
          alt="Background"
          className="w-full h-32 object-cover"
        />
      </div>

      {/* Profile Picture with Edit Icon */}
      <div className="relative">
        <div className="absolute -bottom-16 left-14 transform -translate-x-1/2">
          <img
            src={
              userDetails?.profile_image ||
              "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-gray-100 object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default FollowersMainProfileView;
