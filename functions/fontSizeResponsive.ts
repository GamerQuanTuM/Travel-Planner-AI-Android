import { PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => {
    return (size / fontScale)
}

export default getFontSize