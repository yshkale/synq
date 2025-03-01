import Cookies from "js-cookie";

export interface TaskPayload {
  title: string;
  description?: string;
  priority?: string;
  project?: string;
  labels?: string[];
  dueDate?: string;
}

export const fetchTasks = async () => {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/tasks/get-all-tasks`;
    const authToken = Cookies.get("authToken");

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) throw new Error("Unable to fetch tasks!");

    const responseJson = await response.json();
    return responseJson?.data;
  } catch (err) {
    console.log("Error fetching tasks!", err);
    throw err;
  }
};

export const createTask = async (payload: TaskPayload) => {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/tasks/create-task`;
    const authToken = Cookies.get("authToken");

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Unable to create task!");

    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.log("Error creating task!", err);
    throw err;
  }
};
