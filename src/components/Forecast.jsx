import { motion } from 'framer-motion'
import '../styles/Forecast.css'
import { ReactComponent as CloudIcon } from '../icons/cloud.svg'
import { ReactComponent as FoggyIcon } from '../icons/foggy.svg'
import { ReactComponent as PartlyCloudyIcon } from '../icons/partlyCloudy.svg'
import { ReactComponent as RainyIcon } from '../icons/rainy.svg'
import { ReactComponent as SunnyIcon } from '../icons/sunny.svg'
import { ReactComponent as ThunderstormIcon } from '../icons/thunderstorm.svg'
import { ReactComponent as SnowyIcon } from '../icons/snowy.svg'
import { ReactComponent as HailIcon } from '../icons/hail.svg'
import { ReactComponent as WaterdropIcon } from '../icons/waterdrop.svg'


function Forecast({ data, index }) {
  
  function parseDate(s) {
    const month  = s.substring(5, 7).replace(/^0+/ , '');
    const day = s.substring(8, 10).replace(/^0+/, '');
    const hour = s.substring(11, 13);
    const minute = s.substring(14, 16);
    return `${month}/${day} ${hour}:${minute}`;
  }
  
  function getTimeString(index, s) {
    const timeStrings = ['今日白天', '今晚明晨', '明日白天', '明日晚上']
    if(index % 2 === 0 && s.substring(12, 13) === '6') return timeStrings[index + 1];
    if(index % 2 === 1 && s.substring(12, 13) === '8') return timeStrings[index + 1];
    else return timeStrings[index]; 
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
      timeString: getTimeString(i, weathers.time[i].endTime),
    };
    return <InfoCards key={i} {...cardProps}/>;
  });
  
  return (
      <motion.div className='forecast'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ x: "-100vw", transition:{ type: 'tween', duration: 0.4, ease: 'easeInOut' } }}
        transition={{ type: 'tween', duraiton: 1.5, ease: "easeOut", delay: index * 0.02 }}
      >
        <div className='regionSection'>
          <h1>{region}</h1>
        </div>
        <div className='cardSet'>
          {infoCards}
        </div>
      </motion.div>
  );
}

function InfoCards(props) {
  
  function getWeatherIcon() {
    const id = props.weatherId;
    if (1 <= id && id <= 2) return <SunnyIcon />;
    else if (3 <= id && id <= 4) return <PartlyCloudyIcon />;
    else if (5 <= id && id <= 7) return <CloudIcon />;
    else if ((8 <= id && id <= 14) || (19 <= id && id <= 20) || (29 <= id && id <= 41)) return <RainyIcon />;
    else if ((15 <= id && id <= 18) || (21 <= id && id <= 22)) return <ThunderstormIcon />;
    else if (id == 23 || id == 42) return <SnowyIcon />;
    else if (24 <= id && id <= 28) return <FoggyIcon />;
    else return <HailIcon />
  }

  function getBgStyleString() {
    const maxTemp = props.maxTemp;
    const minTemp = props.minTemp;
    if (maxTemp >= 28) return 'from-orange-300 to-rose-500';
    else if (minTemp <= 18) return 'from-teal-300 to-indigo-500';
    else return 'from-lime-400 to-emerald-500';
  }

  return (
    <div className='infoCard'>

      <div className={'h-[85%] px-4 flex flex-col items-stretch bg-gradient-to-br ' + getBgStyleString()}>
        
        <div className='timeInfo'>
          <div className='w-24 h-8 rounded-full bg-zinc-600 flex justify-center items-center'>
            {props.timeString}
          </div>
          <p className='m-4 text-sm font-semibold'>{props.startTime} ~ {props.endTime}</p>
        </div>
        <div className='mainInfo'>
          {getWeatherIcon()}
          <div className='textPart'>
            <p className='text-3xl font-bold ml-2'>{props.minTemp}°C ~ {props.maxTemp}°C</p>
            <div className='flex items-center'>
              <WaterdropIcon />
              <p className='text-lg'>{props.rainRate}%</p>
            </div>
          </div>
        </div>
        <div className='weatherInfo'></div>
      </div>
      
      <div className='h-[15%] bg-zinc-600 flex flex-row justify-center items-center'>
        {props.comfort}
      </div>

    </div>
  )
}

export default Forecast;