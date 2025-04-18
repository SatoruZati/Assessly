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
      await axios.post("https://localhost:3000/signup", {
        firstName: firstname,
        lastName: lastname,
        username: username,
        password: finalpass,
      });
      alert("Signup Successful!");
      navigate("/signin");
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        alert("Signup Failed: Username already exists!");
      } else {
        alert("Signup Failed: An unexpected error occurred.");
      }
    }
  }

  return (
    <div>
      <h1>Assessly Signup</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}
      >
        <div>
          <Input label="FirstName" type="text" placeholder="First Name" inputRef={firstnameRef} />
        </div>
        <div>
          <Input label="LastName" type="text" placeholder="Last Name" inputRef={lastnameRef} />
        </div>
        <div>
          <Input label="Username" type="email" placeholder="Email" inputRef={usernameRef} />
        </div>
        <div>
          <Input label="Password" type="password" placeholder="Password" inputRef={initialpassRef} />
        </div>
        <div>
          <Input label="Confirm Password" type="password" placeholder="Confirm Password" inputRef={passwordRef} />
        </div>

        <div>
          <button type="submit">
            Create Account
          </button>
        </div>
      </form>

      <div>
        <p>
          Already have an account? <a href="/signin">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;