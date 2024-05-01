import { newRecruits } from '../utils/gameManagement';

export default function Recruitment() {
  return (
    <section className='bottom-section'>
      <div className='recruitment-window'>
        <button onClick={newRecruits}>newRecruits</button>
      </div>
    </section>
  );
}
