import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import { signupSchema } from "../schemas/authSchema";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async () => {
    const result = signupSchema.safeParse({
      email,
      password,
      username,
    });

    if (!result.success) {
      const errorMessages = result.error.issues.map(issue => issue.message).join("\n");
      alert(errorMessages);
      return;
    }

    try {
      setLoading(true);
      await axios.post(BACKEND_URL + "/api/v1/signup", 
        { email, username, password },
        { withCredentials: true }
      );
      alert("You have signed up !!!");
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Error Occurred: ", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl flex flex-col border w-11/12 max-w-sm p-8 gap-4">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        
        <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-center pt-4 text-lg">
          {loading ? (
            <DNA height={50} width={50} />
          ) : (
            <Button
              variant="primary"
              text="Sign up"
              fullWidth={true}
              onClick={signup}
            />
          )}
        </div>
      </div>
    </div>
  );
};
