import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-6xl lg:text-9xl font-extrabold text-center">
        <span className="line-through text-neutral-700">Chaotic.</span> <br />
        <span>Organized.</span>
      </h1>

      <div className="text-sm lg:text-base text-center mt-1 lg:mt-6 text-neutral-700">
        <p>
          Taskal helps you stay organized, prioritize effortlessly, and achieve
          clarity in your work and life
        </p>
        <p>— all in one place.</p>
      </div>

      <Button
        className="bg-orange-600 mt-4"
        onClick={() => navigate("/signup")}
      >
        Start Organizing
      </Button>
    </div>
  );
};
