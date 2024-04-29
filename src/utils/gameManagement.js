export async function fetchGameState() {
  try {
    const res = await fetch('http://localhost:3000/api/home', {
      method: 'GET',
      credentials: 'include',
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function saveGameState() {
  return null;
}
