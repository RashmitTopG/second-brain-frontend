import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("sec-brain-token", token);

      alert("Signin successful");
      navigate("/dashboard");
    } catch (error) {
      console.log("Signin error:", error);
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="flex flex-col bg-white rounded-xl border w-11/12 max-w-sm p-8 gap-4">
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-center pt-4">
          {loading ? (
            <DNA height={50} width={50} />
          ) : (
            <Button
              variant="primary"
              text="Sign in"
              fullWidth={true}
              onClick={signin}
            />
          )}
        </div>
      </div>
    </div>
  );
};
