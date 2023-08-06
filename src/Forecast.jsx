import './styles/Forecast.css'
import { ReactComponent as CloudIcon } from './icons/cloud.svg'
import { ReactComponent as FoggyIcon } from './icons/foggy.svg'
import { ReactComponent as PartlyCloudyIcon } from './icons/partlyCloudy.svg'
import { ReactComponent as RainyIcon } from './icons/rainy.svg'
import { ReactComponent as SunnyIcon } from './icons/sunny.svg'
import { ReactComponent as ThunderstormIcon } from './icons/thunderstorm.svg'
import { ReactComponent as SnowyIcon } from './icons/snowy.svg'
import { ReactComponent as HailIcon } from './icons/hail.svg'
import { ReactComponent as WaterdropIcon } from './icons/waterdrop.svg'

function Forecast({ data }) {
  
  function parseDate(s) {
    const month  = s.substring(5, 7).replace(/^0+/ , '');
    const day = s.substring(8, 10).replace(/^0+/, '');
    const hour = s.substring(11, 13);
    const minute = s.substring(14, 16);
    return `${month}/${day} ${hour}:${minute}`;
  }
  
  const region = data.locationName;
  const weathers = data.weatherElement.find(element => element.elementName === 'Wx');
  const rainRates = data.weatherElement.find(element => element.elementName === 'PoP');
  const minTemps = data.weatherElement.find(element => element.elementName === 'MinT');
  const maxTemps = data.weatherElement.find(element => element.elementName === 'MaxT');
  const comforts = data.weatherElement.find(element => element.elementName === 'CI');
  
  let infoCards = [0, 1, 2].map(i => {
    const cardProps = {
      startTime: parseDate(weathers.time[i].startTime),
      endTime: parseDate(weathers.time[i].endTime),
      weather: weathers.time[i].parameter.parameterName,
      weatherId: weathers.time[i].parameter.parameterValue,
      rainRate: rainRates.time[i].parameter.parameterName,
      minTemp: minTemps.time[i].parameter.parameterName,
      maxTemp: maxTemps.time[i].parameter.parameterName,
      comfort: comforts.time[i].parameter.parameterName,
    };
    return <InfoCards key={i} {...cardProps}/>;
  });
  
  return (
    <div className='flex flex-col items-center'>
      <div className='flex justify-center'>
        <h1 className='text-5xl text-white p-4 font-bold'>{region}</h1>
      </div>
      <div className='cardSet'>
        {infoCards}
      </div>
    </div>
  );
}

function InfoCards(props) {
  
  function getWeatherIcon(id) {
    if (1 <= id && id <= 2) return <SunnyIcon />
    else if (3 <= id && id <= 4) return <PartlyCloudyIcon />
    else if (5 <= id && id <= 7) return <CloudIcon />
    else if ((8 <= id && id <= 14) || (19 <= id && id <= 20) || (29 <= id && id <= 41)) return <RainyIcon />
    else if ((15 <= id && id <= 18) || (21 <= id && id <= 22)) return <ThunderstormIcon />
    else if (id == 23 || id == 42) return <SnowyIcon />
    else if (24 <= id && id <= 28) return <FoggyIcon />
    else return <HailIcon />
  }

  return (
    <div className='infoCard'>
      <p>{props.startTime} ~ {props.endTime}</p>
      <div className='area-1'>
        {getWeatherIcon(props.weatherId)}
        <p>{props.minTemp}°C ~ {props.maxTemp}°C</p>
      </div>
      <div className='area-2'>
        <WaterdropIcon />
        <p>{props.rainRate}%</p>
      </div>
      <p>{props.comfort}</p>
    </div>
  )
}

export default Forecast;