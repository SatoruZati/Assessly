import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../Components/Input";

const Signup: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const initialpassRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const firstname = firstnameRef.current?.value;
    const lastname = lastnameRef.current?.value;
    const username = usernameRef.current?.value;
    const initialpassword = initialpassRef.current?.value;
    const finalpass = passwordRef.current?.value;

    if (!firstname || !lastname || !username || !initialpassword || !finalpass) {
      alert("Please fill in all fields.");
      return;
    }

    if (initialpassword !== finalpass) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/v1/auth/signup", {
        firstName: firstname,
        lastName: lastname,
        username: username,
        password: finalpass,
      });
      alert("Signup Successful!");
      navigate("/signin");
    } catch (error: any) {
      console.error("Signup Error:", error);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);
        if (error.response.status === 409) {
          alert("Signup Failed: Username already exists!");
        } else {
          alert(`Signup Failed: ${error.response.data.message || 'Server error'}`);
        }
      } else if (error.request) {
        console.error("Error Request:", error.request);
        alert("Signup Failed: Could not connect to the server. Please try again later.");
      } else {
        console.error("Error Message:", error.message);
        alert("Signup Failed: An unexpected error occurred.");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Assessly
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signup();
          }}
          className="space-y-4"
        >
          <div className="mb-4">
            <Input
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              inputRef={firstnameRef}
             />
          </div>

           <div className="mb-4">
            <Input
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              inputRef={lastnameRef}
             />
          </div>

           <div className="mb-4">
            <Input
              label="Username (Email)"
              type="email"
              placeholder="you@example.com"
              inputRef={usernameRef}
             />
          </div>

          <div className="mb-4">
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              inputRef={initialpassRef}
             />
          </div>

           <div className="mb-4">
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              inputRef={passwordRef}
             />
          </div>


          <div className="pt-2">
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600">
          <p>
            Already have an account?{' '}
            <a href="/signin" className="font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;