import { useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = ()=>{

    const[username , setUsername] = useState("");
    const[password , setPassword] = useState("");
    const[email , setEmail] = useState("");


    const navigate = useNavigate();

const signup = async () => {
  try {
    await axios.post(
      BACKEND_URL + "/api/v1/signup",
      {
        email,
        username,
        password,
      }
    );

    alert("You have signed up !!!");
    navigate("/dashboard");
  } catch (error) {
    console.log("Error Occured :  ", error);
  }
};


    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl flex flex-col border min-w-48 p-8">
                <Input placeholder="Email" onChange={(e)=>{
                    setEmail(e.target.value);
                }}></Input>
                <Input placeholder="Username" onChange={(e)=>{
                    setUsername(e.target.value);
                }}></Input>
                <Input placeholder="Password" onChange={(e)=>{
                    setPassword(e.target.value);
                }}></Input>
                <div className="flex justify-center pt-4 text-lg"> <Button variant="primary" text="Sign up" fullWidth={true} onClick={signup}></Button></div>
                
            </div>
        </div>
    )
}