import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import '../stylesheets/home.css';

Home.propTypes = {
  gameState: PropTypes.object,
};

export default function Home({ gameState }) {
  const nav = useNavigate();
  const user = 'TEST';

  return <HomeHeader user={gameState.owner} />;
}
