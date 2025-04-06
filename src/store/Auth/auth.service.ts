export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/users/login`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage =
        responseData?.message || responseData?.error || "Error logging user in";
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};

export const signupUser = async (payload: SignupPayload) => {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/users/signup`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseJson = await response.json();

    if (!response.ok)
      throw new Error(
        responseJson?.message || "Something went wrong, please try again later!"
      );

    return responseJson;
  } catch (err) {
    console.log("Error signing up user!", err);
    throw err;
  }
};
