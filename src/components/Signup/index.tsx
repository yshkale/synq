/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/hooks/use-toast";
import { Banner } from "./components/Banner";
import { SignupForm } from "./components/SignupForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AsyncState } from "@/helper/constants";

export const Signup = () => {
  const { toast } = useToast();
  const error = useSelector(
    (state: any) => state.auth.signupErrorResponse?.message
  );
  const signupApiStatus = useSelector(
    (state: any) => state.auth.signupApiStatus
  );

  useEffect(() => {
    if (signupApiStatus !== AsyncState.REJECTED) return;
    toast({
      description: error,
      variant: "destructive",
    });
  }, [signupApiStatus, error, toast]);
  return (
    <main className="flex flex-col lg:flex-row">
      <Banner />
      <SignupForm />
    </main>
  );
};
