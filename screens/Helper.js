import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const heigth = Dimensions.get('window').height;

export const responsiveHeight = (percentage) => {
    return heigth * (percentage / 100);
}

export const responsiveWidth = (percentage) => {
    return width * (percentage / 100);
}

export const responsiveFontSize = (f) => {
    const tempHeight = (16/9)*width;
    return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2))*(f/100);
  };