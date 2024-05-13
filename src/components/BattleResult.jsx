import PropTypes from 'prop-types';

BattleResult.propTypes = {
  battleData: PropTypes.object,
};

export default function BattleResult({ battleData }) {
  return <h1>BattleData</h1>;
}
