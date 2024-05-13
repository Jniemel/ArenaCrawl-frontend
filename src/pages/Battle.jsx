import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
import GameWindow from '../components/GameWindow';

Battle.propTypes = {
  battleState: PropTypes.object,
};

export default function Battle({ battleState }) {
  return battleState.status === 'finished' ? (
    <h1>battleState.log</h1>
  ) : (
    <GameWindow battleData={battleState} />
  );
}
