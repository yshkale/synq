/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { AsyncState } from "@/helper/constants";
import {
  addLoginEmail,
  addLoginPassword,
  loginUser,
} from "@/store/Auth/auth.slice";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const loginEmail = useSelector(
    (state: any) => state.auth.loginUserData?.email
  );
  const loginPassword = useSelector(
    (state: any) => state.auth.loginUserData?.password
  );
  const authToken = useSelector(
    (state: any) => state.auth.loginApiResponse?.token
  );
  const loginStatus = useSelector((state: any) => state.auth.loginApiStatus);

  const handleChange = (e: any, type: string) => {
    switch (type) {
      case "email":
        dispatch(addLoginEmail(e.target.value));
        break;

      case "password":
        dispatch(addLoginPassword(e.target.value));
        break;
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: loginEmail,
        password: loginPassword,
      })
    );
  };

  useEffect(() => {
    if (authToken) {
      login(authToken);
      navigate("/");
    }
  }, [authToken, login, navigate]);

  return (
    <Card className="lg:w-96">
      <form onSubmit={handleLogin}>
        <CardContent>
          <CardHeader className="text-neutral-800 flex text-left px-2 space-y-1">
            <p className="font-semibold text-neutral-600">
              Login to
              <span className="text-orange-600 font-bold px-1.5">Synq</span>
            </p>
            <p className="text-sm text-neutral-500">
              Enter your email below to login to your account
            </p>
          </CardHeader>

          <div className="space-y-3 mt-2">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => handleChange(e, "email")}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => handleChange(e, "password")}
              required
            />

            <p className="text-xs text-neutral-400 text-right cursor-pointer">
              Forgot password?
            </p>
          </div>

          <CardFooter className="flex flex-col px-0 space-y-3 pb-0 mt-4">
            <Button type="submit" className="w-full mt-6">
              {loginStatus === AsyncState.PENDING ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Log in"
              )}
            </Button>
            <div className="text-xs flex space-x-1 text-neutral-500">
              <p>Don&apos;t have an account?</p>
              <span
                onClick={() => navigate("/signup")}
                className="text-neutral-800 border-b border-neutral-300 hover:border-orange-600 cursor-pointer"
              >
                signup
              </span>
            </div>
          </CardFooter>
        </CardContent>
      </form>
    </Card>
  );
};
