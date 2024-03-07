import "./altModeCheckbox.css";
import {useDispatch, useSelector} from "react-redux";
import {toggleAltMode} from "../store/tileGridSlice";

const AltModeCheckbox = () => {
    const tileGridState = useSelector(state => state.tileGrid);
    const dispatch = useDispatch();
    const checkboxClassName = 'alt-mode-checkbox ' + (
        tileGridState.altModeEnabled ? 'alt-mode-checkbox-checked' : ''
    );

    return (
        <div
            className='alt-mode-checkbox-container center-horizontal-content'
            onClick={() => dispatch(toggleAltMode())}
        >
            <div className={checkboxClassName}/>
            <label style={{color: 'white', marginLeft: '0.7rem'}}>
                Alternative mode (if it's hard to distinguish colors)
            </label>
        </div>
    );
};

export default AltModeCheckbox;
