import './tile.css'

const Tile = ({color, isFaced = true, isLocked = false}) => {
    return (
        <div>
            <div className="tile" style={{
                backgroundColor: color,
                visibility: isFaced ? "visible" : "hidden"
            }}/>
        </div>
    );
}

export default Tile;
