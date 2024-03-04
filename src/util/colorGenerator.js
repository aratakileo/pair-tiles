import {getRandInt} from "./index";

/**
 * Returns a color that is neither too dark nor too similar to white
 * @returns {number}
 */
const getRandBrightColor = () => {
    return getRandInt(0x777777, 0xcccccc);
};

const getRGB = (color) => {
    return [(color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff];
};

/**
 * Returns the length of the distance between two colors in a three-dimensional color space
 */
const getColorDiff = (color1, color2) => {
    const [color1RGB, color2RGB] = [getRGB(color1), getRGB(color2)];

    return Math.sqrt(color1RGB.map(
        (val, i) => Math.pow(val - color2RGB[i], 2)
    ).reduce((sum, val) => sum + val, 0));
}

/**
 * Checks if the color is not too similar to other colors
 */
const isDistinct = (color, colors) => {
    for (const icolor of colors)
        if (getColorDiff(icolor, color) < 70)
            return false;

    return true;
}

const getRandColors = (count) => {
    const colors = [];

    while (colors.length < count) {
        const color = getRandBrightColor();

        if (isDistinct(color, colors))
            colors.push(color);
    }

    return colors.map(color => '#' + color.toString(16));
};

export default getRandColors;
