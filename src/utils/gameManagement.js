export async function newRecruits() {
  const res = await fetch('http://localhost:3000/api/char/recruits', {
    method: 'GET',
    credentials: 'include',
  });
  /*
  let json = null;
  if (res.ok) {
    json = await res.json();
  }
  */
  console.log(res);
}

export function saveGameState() {
  return null;
}
