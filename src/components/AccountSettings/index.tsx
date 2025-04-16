/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateUserData, updateUserDataLocal } from "@/store/User/users.slice";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { AsyncState } from "@/helper/constants";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const AccountSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const userData = useSelector((state: any) => state.users.userData?.user);
  const userDataLocal = useSelector((state: any) => state.users.userDataLocal);

  const updateUserDataError = useSelector(
    (state: any) => state.users.updateUserDataErrorResponse
  );
  const updateUserDataApiStatus = useSelector(
    (state: any) => state.users.updateUserDataApiStatus
  );

  useEffect(() => {
    if (updateUserDataApiStatus === AsyncState.REJECTED) {
      toast({
        description: updateUserDataError?.message,
        variant: "destructive",
      });
    }

    if (updateUserDataApiStatus === AsyncState.FULFILLED) {
      toast({
        description: "Account updated successfully!",
      });
    }
  }, [updateUserDataApiStatus, updateUserDataError]);

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (type: string, value: string) => {
    dispatch(
      updateUserDataLocal({
        type,
        value,
      })
    );
  };

  const handleDiscard = () => {
    navigate("/");
  };

  const checkPasswords = () => {
    // Ensure both passwords are provided
    if (!userDataLocal.oldPassword || !userDataLocal?.newPassword) {
      return true;
    }

    // Check if new password is at least 8 characters long
    if (userDataLocal?.newPassword?.length < 8) {
      setHasError(true);
      setErrorMessage(
        "New password must be longer than 8 characters. It's safe."
      );
      return false; // Return false to stop further execution
    }

    // Check if new password is the same as the old password
    if (userDataLocal?.newPassword === userDataLocal?.oldPassword) {
      setHasError(true);
      setErrorMessage("Old password and new password cannot be the same.");
      return false; // Return false to stop further execution
    }

    // If all checks pass, reset error states and return true
    setHasError(false);
    setErrorMessage("");
    return true;
  };

  const handleSaveChanges = () => {
    // Call checkPasswords to ensure passwords are valid
    if (!checkPasswords()) return;

    // Dispatch action to update user data if passwords are valid
    dispatch(
      updateUserData({
        userId: userData?._id,
        userData: userDataLocal,
      })
    );
  };

  return (
    <main className="flex justify-center items-center pt-20 lg:mr-20 mx-6 lg:mx-0">
      <section className="w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-neutral-500">Account</h1>

        <div className="py-10 space-y-6">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="name"
              id="name"
              placeholder="Name"
              className="placeholder:text-sm text-neutral-700"
              onChange={(e) => handleChange("name", e.target.value)}
              value={userDataLocal?.name}
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              className="placeholder:text-sm text-neutral-700"
              onChange={(e) => handleChange("email", e.target.value)}
              value={userDataLocal?.email}
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="password">Old Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your existing password"
              className="placeholder:text-sm text-neutral-700"
              onChange={(e) => handleChange("oldPassword", e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your new password"
              className="placeholder:text-sm text-neutral-700"
              onChange={(e) => handleChange("newPassword", e.target.value)}
            />
          </div>

          {hasError && (
            <div className="text-xs px-1 text-red-700">{errorMessage}</div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <Button
            variant={"secondary"}
            className="bg-neutral-200"
            onClick={handleDiscard}
          >
            Discard
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-500 w-36"
            disabled={
              (userDataLocal?.name === userData?.name &&
                userDataLocal?.email === userData?.email &&
                userDataLocal?.newPassword === null &&
                userDataLocal?.oldPassword === null) ||
              updateUserDataApiStatus === AsyncState.PENDING ||
              updateUserDataApiStatus === AsyncState.FULFILLED
            }
            onClick={handleSaveChanges}
          >
            {updateUserDataApiStatus === AsyncState.PENDING ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </section>
    </main>
  );
};
