/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { AsyncState } from "@/helper/constants";
import {
  addSignupConfirmPassword,
  addSignupEmail,
  addSignupName,
  addSignupPassword,
  signupUser,
} from "@/store/Auth/auth.slice";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const signupName = useSelector(
    (state: any) => state.auth.signupUserData?.name
  );
  const signupEmail = useSelector(
    (state: any) => state.auth.signupUserData?.email
  );
  const signupPassword = useSelector(
    (state: any) => state.auth.signupUserData?.password
  );
  const signupConfirmPassword = useSelector(
    (state: any) => state.auth.signupUserData?.confirmPassword
  );
  const authToken = useSelector(
    (state: any) => state.auth.signupApiResponse?.token
  );
  const signupStatus = useSelector((state: any) => state.auth?.signupApiStatus);

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const handleChange = (e: any, type: string) => {
    switch (type) {
      case "name":
        dispatch(addSignupName(e.target.value));
        break;

      case "email":
        dispatch(addSignupEmail(e.target.value));
        break;

      case "password":
        dispatch(addSignupPassword(e.target.value));
        break;

      case "confirmPassword":
        dispatch(addSignupConfirmPassword(e.target.value));
        break;
    }
  };

  const validatePassword = () => {
    if (signupPassword?.length < 5) {
      setPasswordError(true);
      setPasswordErrorMsg(
        "Longer passwords are safe. Please set a password longer than 5 characters."
      );
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setPasswordError(true);
      setPasswordErrorMsg("Oops! Passwords did not match.");
      return;
    } else {
      setPasswordError(false);
    }
  };

  const handleSignup = (e: any) => {
    e.preventDefault();
    validatePassword();

    if (passwordError) return;

    dispatch(
      signupUser({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
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
    <section className="lg:px-10 py-6 w-full lg:w-1/2 lg:h-screen">
      <div className="lg:flex justify-end hidden">
        <Button
          variant={"secondary"}
          className="bg-neutral-200"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>

      <div className="flex items-center justify-center h-5/6 pt-8 lg:pt-0">
        <form
          className="w-full px-12 lg:px-0 lg:w-2/5"
          onSubmit={(e) => handleSignup(e)}
        >
          <div className="text-center space-y-1">
            <p className="font-semibold text-neutral-800">
              Create your account
            </p>
            <p className="text-sm text-neutral-500">
              Enter your email below to continue signing up
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-3 mt-8">
            <Input
              className="placeholder:text-sm lg:placeholder:text-base"
              name="name"
              placeholder="Name"
              value={signupName}
              onChange={(e) => handleChange(e, "name")}
              required
            />
            <Input
              className="placeholder:text-sm lg:placeholder:text-base"
              type="email"
              name="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => handleChange(e, "email")}
              required
            />
            <Input
              className="placeholder:text-sm lg:placeholder:text-base"
              type="password"
              name="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => handleChange(e, "password")}
              required
            />
            <Input
              className="placeholder:text-sm lg:placeholder:text-base"
              name="confirm-password"
              placeholder="Confirm Password"
              value={signupConfirmPassword}
              onChange={(e) => handleChange(e, "confirmPassword")}
              required
            />
          </div>

          {passwordError && (
            <p className="text-xs text-red-700 mt-3">{passwordErrorMsg}</p>
          )}

          <Button
            className="w-full mt-6"
            type="submit"
            disabled={signupStatus === AsyncState.PENDING}
          >
            {signupStatus === AsyncState.PENDING ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};
