import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChampDetails from './ChampDetails';

Recruitment.propTypes = {
  recruitees: PropTypes.object,
};

export default function Recruitment({ recruitees }) {
  const [selectedRecruit, setSelectedRecruit] = useState(
    recruitees[0].recruitee,
  );

  const recruitList = recruitees.map((recruit) => {
    return (
      <div
        key={uuidv4()}
        className={
          selectedRecruit === recruit.recruitee
            ? 'recruit-list-selected'
            : 'recruit-list-row'
        }
        onClick={() => {
          setSelectedRecruit(recruit.recruitee);
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
          <ChampDetails champ={selectedRecruit} />
        </div>
      </div>
    </section>
  );
}
