import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("Invalid login credentials"); // Error message
    }

    const data = await response.json();
    return data; // { token: "JWT_TOKEN" }
  } catch (error) {
    console.error("Login Error:", error);
    return null; // Return null on failure
  }
};

export { login };

