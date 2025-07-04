import { useState } from "react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Backend_url } from "../../config";
import { GridLoader } from "react-spinners";
import axios from "axios";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  async function onSubmit() {
    setIsLogin(true);
    try {
      const response = await axios.post(Backend_url + "/login", {
        username,
        password,
      });
      setIsLogin(false);
      console.log(response.status);
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);

      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.message);
    }

    setIsLogin(false);
  }

  if (isLogin)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <GridLoader />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 w-full h-screen bg-gray-100  items-center justify-center">
      <div className="p-6 flex flex-col gap-4 shadow-2xl rounded-2xl ">
        <div className="w-full text-3xl pb-3.5">Login</div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="username" className=" font-semibold">
            UserName
          </label>
          <input
            type="text"
            placeholder="username"
            id="username"
            name="username"
            value={username}
            className="border rounded-md px-3 py-2"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className=" font-semibold">
            Password
          </label>
          <input
            type="text"
            placeholder="password"
            id="password"
            name="password"
            value={password}
            className="border rounded-md px-3 py-2"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <Button
            variant="primary"
            size="md"
            text="Login"
            onClick={() => onSubmit()}
            disabled={isLogin}
          />
        </div>

        <div>
          Don't have any account?
          <span
            className="text-blue-600 pl-1.5 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
};
