import './playAgainButton.css'
import {useDispatch} from "react-redux";
import {restartGame} from "../store/tileGridSlice";

const PlayAgainButton = () => {
    const dispatcher = useDispatch();
    return <img
        className='play-again-btn'
        src='refresh.svg'
        alt='refresh button'
        onClick={() => dispatcher(restartGame())}
    />
};

export default PlayAgainButton;
