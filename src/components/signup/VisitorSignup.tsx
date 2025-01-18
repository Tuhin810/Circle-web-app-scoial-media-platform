/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef } from "react";
import TermsCondition from "../shared/terms&conditionModel/Terms&Condition";
import { api } from "../../utils/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";

const VisitorSignUp = () => {
  const [userDetails, setUserDetails] = useState({
    full_name: "",
    user_name: "",
    email: "",
    bio: "",
    password: "",
    is_adult: false,
    role: "visitor",
    signature_url: "",
    cpassword:""
  });
  const [uploadProfilePhoto, setUploadProfilePhoto] = useState<File | null>(
    null
  );
  const [uploadProfileImage, setUploadProfileImage] = useState<File | null>(
    null
  );
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [signatureUrl, setSignatureURL] = useState<string | null>(null);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const navigate = useNavigate();

  const handleClearSignature = () => {
    sigCanvas.current?.clear();
    setSignatureURL(null);
  };

  const handleSaveSignature = () => {
    if (sigCanvas.current) {
      const signatureURL = sigCanvas.current.toDataURL();
      if (signatureURL) {
        setSignatureURL(signatureURL);
        setUserDetails((prev) => ({
          ...prev,
          signature_url: signatureURL,
        }));
      } else {
        setSignatureURL(null);
      }
    }
  };

  const [error, setError] = useState("");
  const checkPassword = (e:any) => {
    const { name, value, type, checked } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (userDetails.password && value !== userDetails.password) {
      setError("Passwords do not match");
    } else {
      setError(""); // Clear the error if passwords match
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password" || name === "confirmPassword") {
      setError(""); // Reset error when the user starts typing
    }

  };

  const handleSignup = useCallback(
    async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      if (!userDetails.is_adult || !termsAccepted) {
        Swal.fire({
          title: "Alert!",
          text: "Please select the 'Are you 18+' and 'Accept Terms and Conditions' checkboxes.",
          icon: "warning",
          confirmButtonText: "OK",
          confirmButtonColor: "#67043d",
          background: "#f5f5f5",
          customClass: {
            popup: "rounded-xl shadow-lg",
          },
        });
        return;
      }
      try {
        const formData = new FormData();
        formData.append("userDetails", JSON.stringify(userDetails));
        if (uploadProfilePhoto) {
          formData.append("age_certificate_url", uploadProfilePhoto);
        }
        if (uploadProfileImage) {
          formData.append("profile_image", uploadProfileImage);
        }

        console.log("Checking form data--->", formData);
        const response = await api.auth.signupCustomer(formData);
        if (response) {
          setUserDetails({
            full_name: "",
            email: "",
            password: "",
            is_adult: false,
            user_name: "",
            bio: "",
            role: "visitor",
            signature_url: "",
            cpassword:""
          });
          // setUploadProfilePhoto(null);

          Swal.fire({
            title: "Success!",
            text: "You have successfully registered as a Visitor.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#67043d",
            background: "#f5f5f5",
            customClass: {
              popup: "rounded-xl shadow-lg",
            },
          }).then(() => {
            navigate("/");
          });
        }
      } catch (error: any) {
        console.error(error);
        if (error.response && error.response.status === 409) {
          Swal.fire({
            title: "Conflict!",
            text: "User already exists. Please try a different email or username.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
            background: "#f5f5f5",
            customClass: {
              popup: "rounded-xl shadow-lg",
            },
          });
        } else {
          // Handle other errors
          Swal.fire({
            title: "Error!",
            text: "An unexpected error occurred. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
            background: "#f5f5f5",
            customClass: {
              popup: "rounded-xl shadow-lg",
            },
          });
        }
      }
    },
    [userDetails, uploadProfilePhoto, navigate, termsAccepted]
  );

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row pb-5 mb- bg-white mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 h-56 flex flex-col items-center justify-center p-12 bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://t3.ftcdn.net/jpg/00/97/70/32/360_F_97703200_cYbuFjPW6nffG2qxfmejnEqocG7yark2.jpg')",
            }}
          >
            <h1 className="text-white text-5xl font-extrabold mb-3 drop-shadow-2xl">
              Join Now
            </h1>
            <div>
              <p className="text-white text-center font-extrabold drop-shadow-2xl">
                Create your account. It’s free and only takes a minute.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-8 px-12">
            <form onSubmit={handleSignup}>
              {/* <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  name="fullName"
                  value={userDetails.full_name}
                  onChange={handleChange}
                  className="border border-gray-400 py-2 px-2 rounded-lg w-full"
                  placeholder="Enter Full Name"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={userDetails.lastName}
                  onChange={handleChange}
                  className="border border-gray-400 py-2 px-2 rounded-lg"
                  placeholder="Last Name"
                  required
                />
              </div> */}
              <div>
                <div className="text-lg">Full Name</div>
                <input
                  type="text"
                  name="full_name"
                  value={userDetails.full_name}
                  onChange={handleChange}
                  className="border border-gray-400 py-2 px-2 rounded-lg w-full"
                  placeholder="Enter Full Name"
                  required
                />
              </div>
              <div className="mt-5">
                <div className="text-lg">Email</div>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border border-gray-400 py-2 px-2 rounded-lg w-full"
                  required
                />
              </div>
              <div className="mt-5">
                <div className="text-lg">Bio</div>
                <textarea
                  name="bio"
                  value={userDetails.bio}
                  onChange={handleChange}
                  placeholder="Bio"
                  className="border border-gray-400 py-2 px-2 rounded-lg w-full h-24"
                  required
                />
              </div>
              <div className="mt-5">
                <div className="text-lg">User Name</div>
                <input
                  type="text"
                  name="user_name"
                  value={userDetails.user_name}
                  onChange={handleChange}
                  placeholder="User Name"
                  className="border border-gray-400 py-2 px-2 rounded-lg w-full"
                  required
                />
              </div>
              <div className="mt-5">
                <div className="text-lg">Password</div>
                <input
                  type="password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="border border-gray-400 py-2 px-2 rounded-lg w-full"
                  required
                />
              </div>
              <div>
                <div className="text-lg mt-5">Confirm Password</div>
                <input
                  type="cpassword"
                  name="cpassword"
                  value={userDetails.cpassword}
                  onChange={checkPassword}
                  placeholder="Confirm Password"
                  className="border border-gray-400 py-2 px-2 rounded-lg w-full"
                  required
                />
                {
                  error && <div className="text-red-500 text-sm">Password doesn't match</div>
                }
              </div>

              <div className="mt-5">
                <div className="text-lg">Profile Picture</div>
                <button
                  style={{
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                  role={undefined}
                  tabIndex={-1}
                >
                  <input
                    type="file"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        console.log("Selected file:", file);
                        setUploadProfileImage(file);
                      }
                    }}
                    required
                  />
                </button>
              </div>
              

              <div className="mt-5">
                <div className="text-lg">Age proof</div>
                <button
                  style={{
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                  role={undefined}
                  tabIndex={-1}
                >
                  <input
                    type="file"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        console.log("Selected file:", file);
                        setUploadProfilePhoto(file);
                      }
                    }}
                    required
                  />
                </button>
              </div>

              <div className="mt-5">
                <h3>Provide Your E-Signature</h3>
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="black"
                  canvasProps={{
                    className: "border border-gray-400 rounded-lg w-full h-32",
                  }}
                  onEnd={handleSaveSignature}
                />
                <div className="flex justify-between mt-2">
                  <button
                    type="button"
                    onClick={handleClearSignature}
                    className="text-red-500 underline"
                  >
                    Clear Signature
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-center">
                <input
                  type="checkbox"
                  name="is_adult"
                  checked={userDetails.is_adult}
                  onChange={handleChange}
                  className="border border-gray-400 mr-5"
                />
                Are you 18+?
              </div>

              <div className="mt-5 flex items-center">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted((prev) => !prev)}
                  className="border border-gray-400 mr-5"
                />
                <TermsCondition />
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className={`${!userDetails.is_adult || !termsAccepted
                      ? "bg-gray-400"
                      : "bg-[#67043d]"
                    } rounded-full w-full font-semibold text-lg text-center text-white py-2`}
                  disabled={!userDetails.is_adult || !termsAccepted}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorSignUp;
