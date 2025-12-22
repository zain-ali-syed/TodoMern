type User = {
  email: string;
  password: string;
};

export const registerUser = async (user: User) => {
  const response = await fetch("http://localhost:5000/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Include cookies in the request
    body: JSON.stringify(user),
  });

  const data = await response.json();

  // Also If backend catches an error and sends 500, response.ok will be false
  // because 500 is not in the 200-299 range
  if (!response.ok) {
    // Use the custom message from backend or fallback to status text
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

export const loginUser = async (user: User) => {
  const response = await fetch("http://localhost:5000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Include cookies in the request
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Error registering user");
  return response.json();
};
