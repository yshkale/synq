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
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/users/login`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error logging user in.");
    }

    const responseJson = await response.json();

    return responseJson;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};

export const signupUser = async (payload: SignupPayload) => {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/users/signup`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Error signing up user!");

    const responseJson = await response.json();

    return responseJson;
  } catch (err) {
    console.log("Error signing up user!", err);
    throw err;
  }
};
