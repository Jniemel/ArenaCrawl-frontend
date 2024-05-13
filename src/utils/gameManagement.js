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

// starts a new battle or returns active battles data
export async function startBattle() {
  try {
    const res = await fetch('http://localhost:3000/api/battle/start', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const json = await res.json();
      return json;
    }
    return { error: 'response status not 200' };
  } catch (err) {
    console.log(err.name);
    return { error: err };
  }
}

export async function saveBattle(unitStates, logMsg) {
  try {
    const res = await fetch('http://localhost:3000/api/battle/save', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unitStates, logMsg }),
    });
    return res.status;
  } catch (err) {
    console.log(err.name);
    return { error: err };
  }
}

// sets final state of the battle
export async function finishBattle(unitStates, result) {
  try {
    const res = await fetch('http://localhost:3000/api/battle/finish', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unitStates, result }),
    });
    return res.status;
  } catch (err) {
    console.log(err.name);
    return { error: err };
  }
}
