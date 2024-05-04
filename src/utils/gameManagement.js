export async function buyRecruit(recruit, chars, money) {
  if (!(chars < 12)) {
    alert('Your team is full. You cannot have more than 12 champions.');
  } else if (money < recruit.price) {
    alert(
      `You cannot afford to recruit this champion!.\nRecruit cost: ${recruit.price} coins.\n You have: ${money} coins.`,
    );
  }
  try {
    const res = await fetch('http://localhost:3000/api/char/buy', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recruit }),
    });
    return res.status;
  } catch (err) {
    console.log(err.name);
    return { error: err };
  }
}

export function saveGameState() {
  return null;
}
