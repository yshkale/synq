/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";

export const fetchUserData = async () => {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/users/get-user-data`;

    const authToken = Cookies.get("authToken");

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const responseJson = await response.json();

    if (!response.ok)
      throw new Error(
        responseJson?.message || "Something went wrong! Please try again later."
      );

    return responseJson?.data;
  } catch (err) {
    console.log("Error fetching user data!", err);
    throw err;
  }
};

export const updateUserData = async (userId: string, userData: any) => {
  try {
    const apiUrl = `${
      import.meta.env.VITE_API_URL
    }/users/update-user-data/${userId}`;

    const authToken = Cookies.get("authToken");

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(userData),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw (
        responseJson?.message || "Something went wrong! Please try again later."
      );
    }

    return responseJson?.data;
  } catch (err) {
    console.log("Error fetching user data!", err);
    throw { message: err instanceof Error ? err.message : String(err) };
  }
};
