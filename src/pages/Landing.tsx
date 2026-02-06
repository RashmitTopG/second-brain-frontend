import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

const Landing = () => {
    const sender = useNavigate();
  
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="flex gap-6">
          <Button
            variant="primary"
            text="Sign In"
            onClick={() => sender("/signin")}
          />
          <Button
            variant="secondary"
            text="Sign Up"
            onClick={() => sender("/signup")}
          />
        </div>
      </div>
    );
  };
  
export default Landing;