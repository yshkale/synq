import { Banner } from "./components/Banner";
import { SignupForm } from "./components/SignupForm";

export const Signup = () => {
  return (
    <main className="flex">
      <Banner />
      <SignupForm />
    </main>
  );
};
