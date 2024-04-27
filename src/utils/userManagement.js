export async function signUp(username, password) {
  try {
    const res = await fetch("http://localhost:3000/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err.name);
    return null;
  }
}

export async function logIn(username, password) {
  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return res.status;
  } catch (err) {
    console.error(err.name);
    return null;
  }
}
