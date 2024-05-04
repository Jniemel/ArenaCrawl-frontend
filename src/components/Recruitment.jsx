import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { buyRecruit } from '../utils/gameManagement';
import ChampDetails from './ChampDetails';

Recruitment.propTypes = {
  recruitees: PropTypes.object,
  numOfCharacters: PropTypes.number,
  playerMoney: PropTypes.number,
};

export default function Recruitment({
  recruitees,
  numOfCharacters,
  playerMoney,
}) {
  const [selectedRecruit, setSelectedRecruit] = useState(recruitees[0]);
  const recruitList = recruitees.map((recruit) => {
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

  return (
    <section className='bottom-section'>
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
          <ChampDetails champ={selectedRecruit.recruitee} />
          <div className='buy-recruit'>
            <button
              onClick={() => {
                console.log(selectedRecruit, numOfCharacters, playerMoney);
              }}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
