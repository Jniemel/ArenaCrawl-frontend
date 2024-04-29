export async function fetchGameState() {
  try {
    const res = await fetch("http://localhost:3000/api/home", {
      method: "GET",
      credentials: "include",
    });
    console.log(res.status);
    const json = await res.json();
    console.log(json);
  } catch (err) {
    console.log(err);
    return { error: err };
  }
}

export function saveGameState() {
  return null;
}
