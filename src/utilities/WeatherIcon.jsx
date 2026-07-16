import { WiDaySunny, WiCloud, WiFog, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
export default function getWeatherIcon(code) {
    switch (code) {
        case 0:
          return <WiDaySunny />;
      
        case 1:
        case 2:
        case 3:
          return <WiCloud />;

        case 45:
        case 48:
          return <WiFog />;

        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
          return <WiRain />;

        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
          return <WiRain />;

        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
          return <WiSnow />;

        case 95:
        case 96:
        case 99:
          return <WiThunderstorm />;

        default:
          return "Unknown weather";
    }
}