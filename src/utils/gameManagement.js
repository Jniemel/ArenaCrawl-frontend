export async function buyRecruit(recruit, chars, money) {
  if (!(chars < 12)) {
    alert('Your team is full. You cannot have more than 12 champions.');
    return null;
  } else if (money < recruit.price) {
    alert(
      `You cannot afford to recruit this champion!.\nRecruit cost: ${recruit.price} coins.\nYou have: ${money} coins.`,
    );
    return null;
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

export async function TESTCMD_getNewRecruits() {
  try {
    const res = await fetch('http://localhost:3000/api/char/new', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.status;
  } catch (err) {
    console.log(err.name);
    return { error: err };
  }
}

export async function startBattle() {
  try {
    const res = await fetch('http://localhost:3000/api/battle/start', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.status;
  } catch (err) {
    console.log(err.name);
    return { error: err };
  }
}
