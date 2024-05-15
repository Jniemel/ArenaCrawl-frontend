export async function buyItem(item) {
  try {
    const res = await fetch('http://localhost:3000/api/equipment/buy', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item }),
    });
    return res;
  } catch (err) {
    console.log(err.name);
    return { error: err.statusText, status: err.status };
  }
}
