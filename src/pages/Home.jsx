import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import TeamWindow from '../components/TeamWindow';
import Navigation from '../components/Navigation';
import '../stylesheets/home.css';

Home.propTypes = {
  gameState: PropTypes.object,
};

export default function Home({ gameState }) {
  // const nav = useNavigate();
  const playerTeam = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  return (
    <>
      <HomeHeader user={gameState.owner} />
      <TeamWindow
        teamName={gameState.owner + "'s team"}
        playerTeam={playerTeam}
      />
      <Navigation />
    </>
  );
}
