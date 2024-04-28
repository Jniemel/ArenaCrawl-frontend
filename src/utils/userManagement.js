export async function signUp(username, password) {
  try {
    const res = await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
}

export async function logIn(username, password) {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err.name);
    return { error: err };
  }
}
