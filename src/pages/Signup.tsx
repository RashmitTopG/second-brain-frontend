import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async () => {
    try {
      setLoading(true);
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        email,
        username,
        password,
      });

      alert("You have signed up !!!");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error Occured :  ", error);
    }finally{
      setLoading(false);
      setEmail("");
      setUsername("");
      setPassword("");

    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl flex flex-col border w-11/12 max-w-sm p-8">
        <Input
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
        <Input
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></Input>
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input>

        <div className="flex justify-center pt-4 text-lg">
          {loading ? (
            <DNA height={50} width={50} />
          ) : (
            <Button
              variant="primary"
              text="Sign up"
              fullWidth={true}
              onClick={signup}
            ></Button>
          )}
        </div>
      </div>
    </div>
  );
};
