import { IAdultModelProps } from "../../../@types/props/verifyAdult.interface.props";
import logo from "../../../assets/logo.png"
const AdultVerify: React.FC<IAdultModelProps> = ({ onAgree, onLeave }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md max-w-md w-full">
        <div className="text-center">
          <div className="mb-4">
            <img
              src={logo}
              alt="21x connect Logo"
              className="mx-auto w-20"
            />
          </div>
          <h2 className="text-lg font-bold">Possible Age Restricted Content</h2>
          <p className="mt-4 text-sm">
            This website (21xconnect) contains age-restricted content. If you are
            under the age of 18 years or under the age of majority in the
            location from where you are accessing this website, you do not have
            authorization or permission to enter this website or access any of
            its content.
          </p>
          <p className="mt-2 text-sm">
            If you are over the age of 18 years or over the age of majority in
            the location from where you are accessing this website, by entering
            the website you hereby agree to comply with the{" "}
            <a href="/term-conditions" className="text-blue-500 underline">
              21xconnect Terms of Service
            </a>
            .
          </p>
          <p className="mt-4 text-sm">
            By clicking on the "Enter" button, and by entering this website you
            agree with all the above and certify under penalty of perjury that
            you are above the age of 18 or the age of majority in your location,
            whichever is greater.
          </p>
          <div className="mt-6 flex justify-around">
            <button
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={onLeave}
            >
              Leave
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={onAgree}
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdultVerify;
