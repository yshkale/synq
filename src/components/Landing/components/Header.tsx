import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <section className="flex justify-between items-center ">
      <Logo />
      <div className="flex space-x-6">
        <Button variant={"secondary"} onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button
          className="bg-orange-600 hidden lg:block"
          onClick={() => navigate("/signup")}
        >
          Start Organizing
        </Button>
      </div>
    </section>
  );
};
