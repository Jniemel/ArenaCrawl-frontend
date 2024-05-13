import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

BattleResult.propTypes = {
  gameState: PropTypes.object,
  setViewResults: PropTypes.func,
};

export default function BattleResult({ gameState, setViewResults }) {
  const winner =
    gameState.battle.winner === 'south'
      ? gameState.battle.teamSouth.name
      : gameState.battle.teamNorth.name;

  let turn = -1;
  const log = gameState.battle.log.map((e) => {
    let entry;
    turn += 1;
    switch (e.action) {
      case 'wait':
        entry = (
          <div>
            {`${e.name} `}
            <span style={{ color: 'mediumPurple', fontWeight: 700 }}>
              {'waited '}
            </span>
            {`for better times...`}
          </div>
        );
        break;
      case 'move':
        entry = (
          <div>
            {`${e.name} `}
            <span style={{ color: 'blue', fontWeight: 700 }}>{'moved '}</span>
            {`to x: ${e.x}, y: ${e.y}`}
          </div>
        );
        break;
      case 'melee':
        if (e.damage <= 0) {
          entry = (
            <div>
              {`${e.name} tried to `}
              <span style={{ color: 'red', fontWeight: 700 }}>{'hit '}</span>
              {` ${e.targetName}, but `}
              <span style={{ color: 'lightslategray', fontWeight: 700 }}>
                {'missed '}
              </span>
              <span style={{ color: 'lightslategray', fontWeight: 700 }}>
                {`(dmg: ${e.damage}) `}
              </span>
            </div>
          );
        } else {
          entry = (
            <div>
              {`${e.name} hit `}
              <span style={{ color: 'red', fontWeight: 700 }}>{'hit '}</span>
              {` ${e.targetName}, for `}
              <span style={{ color: 'red', fontWeight: 700 }}>
                {`${e.damage} damage `}
              </span>
            </div>
          );
        }
        break;
      case 'kill':
        entry = (
          <div>
            {`${e.name} `}
            <span style={{ color: 'maroon', fontWeight: 700 }}>
              {'killed '}
            </span>
            {` ${e.targetName} `}
            <span style={{ color: 'maroon', fontWeight: 700 }}>
              {`(${e.damage} damage)`}
            </span>
          </div>
        );
        break;

      default:
        entry = <div>{e.msg}</div>;
        break;
    }
    return (
      <div key={uuidv4()} className='log-entry'>
        <div className='turn-number'>{turn}</div>
        <div className='action'>{entry}</div>
      </div>
    );
  });

  return (
    <div className='battle-results'>
      <div className='result-header'>
        <h3>
          In the latest of thrilling and violent events, <br />
          <span style={{ color: 'blue', fontSize: '21px' }}>
            {`${gameState.battle.teamSouth.name} `}
          </span>
          faced off with
          <span style={{ color: 'red', fontSize: '21px' }}>
            {` ${gameState.battle.teamNorth.name} `}
          </span>
        </h3>
        <h3 style={{ marginBottom: '3px' }}>
          After a long and well fought trial by all the champions who partook in
          the mayhem,
        </h3>
        <h3>
          <span
            style={{
              color: 'orange',
              fontSize: '26px',
            }}
          >
            {`${winner} `}
          </span>
          emerged victorius!
        </h3>
      </div>
      <div className='combat-log'>
        <h3>You can read all about the combat and its many twists below:</h3>
        <div className='log'>{log}</div>
      </div>
      <div>
        <button
          onClick={() => {
            setViewResults(false);
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}
