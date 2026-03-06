import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import { signinSchema } from "../schemas/authSchema";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signin = async () => {
    if (loading) return;

    const result = signinSchema.safeParse({
      username,
      password
    });

    if (!result.success) {
      const errorMessages = result.error.issues.map(issue => issue.message).join("\n");
      alert(errorMessages);
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/api/v1/signin`, 
        { username, password },
        { withCredentials: true }
      );
      alert("Signin successful");
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Signin error:", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="flex flex-col bg-white rounded-xl border w-11/12 max-w-sm p-8 gap-4">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
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
