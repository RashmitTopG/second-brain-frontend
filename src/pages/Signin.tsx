import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signin = async () => {
    try {
      const res = await axios.post(
        BACKEND_URL + "/api/v1/signin",
        new URLSearchParams({
          username,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = res.data.token;

      localStorage.setItem("token", token);

      alert("Signin successful");
      navigate("/dashboard");
    } catch (error) {
      console.log("Signin error:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="flex flex-col bg-white rounded-xl border min-w-48 p-8">
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center pt-4 text-lg">
          <Button
            variant="primary"
            text="Sign in"
            fullWidth={true}
            onClick={signin}
          />
        </div>
      </div>
    </div>
  );
};
