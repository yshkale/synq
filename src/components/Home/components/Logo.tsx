import { useNavigate } from "react-router";
import SynqLogo from "/src/assets/img/synq-logo.svg";

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <img src={SynqLogo} className="h-6 w-auto" onClick={() => navigate("/")} />
  );
};
