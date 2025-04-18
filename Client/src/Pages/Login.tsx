import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../Components/Input";

const Login: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function login() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        username: username,
        password: password,
      });
      alert("Login Successful!");
      localStorage.setItem("token", response.data.token);

      navigate("/home");
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        alert("Login Failed: Invalid credentials!");
      } else {
        alert("Login Failed: An unexpected error occurred.");
      }
    }
  }

  return (
    <div>
      <div>
        <h1>Assessly</h1>
        <h3>Welcome back!</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <Input label="Username" type="email" placeholder="you@example.com" inputRef={usernameRef} />
          <Input label="Password" type="password" placeholder="Enter password" inputRef={passwordRef} />

          <button type="submit">
            Sign In
          </button>
        </form>

        <div>
          <p>
            Don't have an account?{" "}
            <a href="/signup">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;