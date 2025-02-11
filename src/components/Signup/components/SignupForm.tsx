import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";

export const SignupForm = () => {
  const navigate = useNavigate();

  return (
    <section className="px-10 py-6 w-1/2 h-screen">
      <div className="flex justify-end">
        <Button
          variant={"secondary"}
          className="bg-neutral-200"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>

      <div className="flex items-center justify-center h-5/6">
        <form className="w-2/5">
          <div className="text-center space-y-1">
            <p className="font-semibold text-neutral-800">
              Create your account
            </p>
            <p className="text-sm text-neutral-500">
              Enter your email below to continue signing up
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-3 mt-8">
            <Input name="name" placeholder="Name" />
            <Input type="email" name="email" placeholder="Email" />
            <Input type="password" name="password" placeholder="Password" />
            <Input name="confirm-password" placeholder="Confirm Password" />
          </div>

          <Button className="w-full mt-8">Continue</Button>
        </form>
      </div>
    </section>
  );
};
