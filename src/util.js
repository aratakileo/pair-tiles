export const colors = ['#4caf50', '#fff200', '#ff9100', '#f44336', '#0048ff'];

export const getRandColor = () => colors[Math.floor(Math.random() * colors.length)];

export const getTile = (tiles, line, column) => tiles.find(
    tile => tile.line === line && tile.column === column
);
