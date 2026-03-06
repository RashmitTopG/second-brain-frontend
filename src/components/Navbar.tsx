import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Logo } from "../icons/Logo";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 glass bg-white/70 border-b border-purple-medium/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Logo />
            <span className="text-xl font-bold text-purple-dark">Second Brain</span>
          </div>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              text="Sign In"
              onClick={() => navigate("/signin")}
            />
            <Button
              variant="primary"
              text="Sign Up"
              onClick={() => navigate("/signup")}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
