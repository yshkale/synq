/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  addSignupConfirmPassword,
  addSignupEmail,
  addSignupName,
  addSignupPassword,
} from "@/store/Auth/auth.slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  };

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
        <form className="w-2/5" onSubmit={(e) => handleSignup(e)}>
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
              name="name"
              placeholder="Name"
              value={signupName}
              onChange={(e) => handleChange(e, "name")}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => handleChange(e, "email")}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => handleChange(e, "password")}
              required
            />
            <Input
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

          <Button className="w-full mt-6" type="submit">
            Continue
          </Button>
        </form>
      </div>
    </section>
  );
};
