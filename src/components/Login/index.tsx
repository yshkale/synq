/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/hooks/use-toast";
import { LoginForm } from "./components/LoginForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AsyncState } from "@/helper/constants";

export const Login = () => {
  const { toast } = useToast();
  const error = useSelector(
    (state: any) => state.auth.loginErrorResponse?.message
  );
  const loginApiStatus = useSelector((state: any) => state.auth.loginApiStatus);

  useEffect(() => {
    if (loginApiStatus !== AsyncState.REJECTED) return;
    toast({
      variant: "destructive",
      description: error,
    });
  }, [loginApiStatus, error, toast]);

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <LoginForm />
    </main>
  );
};
