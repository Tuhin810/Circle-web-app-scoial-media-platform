import { useNavigate } from "react-router-dom";
import StoreBtn from "../storeBtn/StoreBtn";
import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandSnapchat,
  IconBrandX,
} from "@tabler/icons-react";

const Footer = () => {
  const navigate = useNavigate();

  const handleAboutus = () => {
    navigate("/about-us");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleCategories = () => {
    navigate("/categories");
  };

  const handleContactUs = () => {
    navigate("/contact-us");
  };

  const handleTermandConditions = () => {
    navigate("/term-conditions");
  };

  return (
    <div>
      <div className="top_footer px-3 pt-3">
        <div className="text-lg flex justify-center text-[#67043d] font-semibold">
          You can also find us at
        </div>
        <div className="-mt-2 mx-auto flex justify-center items-center">
          <StoreBtn />
        </div>
      </div>

      <footer className="bg-[#fee6f4] mt-3">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="w-full md:w-1/2 text-lg flex flex-col justify-start items-start font-semibold text-[#67043d] mb-3 md:mb-0">
              Follow us on
              <div className="flex gap-2 mt-1">
                <IconBrandInstagram />
                <IconBrandFacebookFilled />
                <IconBrandSnapchat />
                <IconBrandX />
              </div>
              <a
                href="/signup"
                className="w-32 bg-[#67043d] py-1 items-center flex justify-center 
                rounded-full text-lg font-semibold text-white mt-2"
              >
                Join Now
              </a>
            </div>

            <div className="w-full md:flex-1 flex flex-wrap justify-between">
              <div className="flex flex-col items-start sm:items-center sm:flex-row gap-2 mb-2 sm:mb-0">
                <button
                  className="text-xs font-semibold my-1"
                  onClick={handleHome}
                >
                  Home
                </button>
                <button
                  className="text-xs font-semibold my-1"
                  onClick={handleCategories}
                >
                  Category
                </button>
                <button
                  className="text-xs font-semibold my-1"
                  onClick={handleAboutus}
                >
                  About Us
                </button>
                <button
                  className="text-xs font-semibold my-1"
                  onClick={handleContactUs}
                >
                  Contact Us
                </button>
              </div>

              <div className="flex flex-col items-start sm:items-center sm:flex-row gap-2">
                <div className="text-xs font-semibold my-1">FAQ</div>
                <div className="text-xs font-semibold my-1">Privacy Policy</div>
                <button
                  className="text-xs font-semibold my-1"
                  onClick={handleTermandConditions}
                >
                  Terms & Condition
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
