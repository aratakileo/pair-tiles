import './customCheckbox.css';

const CustomCheckbox = ({caption, checked, onClick, style}) => {
    const checkboxClassName = 'custom-checkbox ' + (checked ? 'custom-checkbox-checked' : '');

    return (
        <div
            className='custom-checkbox-container'
            onClick={onClick}
            style={style}
        >
            <div className={checkboxClassName}/>
            <label style={{color: 'white', marginLeft: '0.7rem'}}>
                {caption}
            </label>
        </div>
    );
}

export default CustomCheckbox;
