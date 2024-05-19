import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { GameStateContext } from '../contexts/gameStateContext';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { TESTCMD_getNewRecruits, buyRecruit } from '../utils/gameManagement';
import ChampDetails from './ChampDetails';

Recruitment.propTypes = {
  recruitees: PropTypes.array,
  numOfCharacters: PropTypes.number,
  playerMoney: PropTypes.number,
};

export default function Recruitment() {
  const { gameState, setGameState } = useContext(GameStateContext);
  const [selectedRecruit, setSelectedRecruit] = useState(
    gameState.recruitment[0],
  );
  const recruitList = gameState.recruitment.map((recruit) => {
    return (
      <div
        key={uuidv4()}
        className={
          selectedRecruit === recruit
            ? 'recruit-list-selected'
            : 'recruit-list-row'
        }
        onClick={() => {
          setSelectedRecruit(recruit);
        }}
      >
        <div>{recruit.recruitee.name}</div>
        <div>{recruit.recruitee.class}</div>
        <div>{recruit.recruitee.age}</div>
        <div>{recruit.price}</div>
      </div>
    );
  });

  const nav = useNavigate();

  async function handleBuyClick() {
    const res = await buyRecruit(
      selectedRecruit,
      gameState.playerTeam.champs.length,
      gameState.playerTeam.money,
    );
    if (res.status === 200) {
      const json = await res.json();
      setGameState(json.state);
    }
  }

  async function NEW_RECRUITS_TEST() {
    const res = await TESTCMD_getNewRecruits();
    if (res.status === 200) {
      const json = await res.json();
      setGameState(json.state);
    }
  }

  return (
    <section className='bottom-section'>
      {!gameState.recruitment.length ? (
        <div className='recruitment-window'>
          <div className='recruitment-empty'>
            <h2>There are no champions to recruit. Come back later.</h2>
            <button onClick={NEW_RECRUITS_TEST}>NEW_RECRUITS_TEST</button>
          </div>
        </div>
      ) : (
        <div className='recruitment-window'>
          <div className='recruit-list'>
            <div className='recruit-list-header'>
              <div>Name</div>
              <div>Class</div>
              <div>Age</div>
              <div>Price</div>
            </div>
            {recruitList}
          </div>
          <div className='recruit-preview'>
            <ChampDetails
              champ={selectedRecruit.recruitee}
              recruitment={true}
            />
            <div className='buy-recruit'>
              <button onClick={handleBuyClick}>Buy</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
