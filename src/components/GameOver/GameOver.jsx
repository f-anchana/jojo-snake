import s from './GameOver.module.scss';

const GameOver = ({ replay }) => {
    return (
        <div className={s.gameOver}>
        {/* <h1>Game Over</h1> */}
        <button onClick={replay} className={s.btn} >Try again?</button>
        </div>
    );
    }

export default GameOver;