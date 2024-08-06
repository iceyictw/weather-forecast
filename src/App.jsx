import { useEffect, useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Forecast from './components/Forecast.jsx'
import Dropdown from './components/Dropdown.jsx'
import { ReactComponent as TwitterIcon } from './icons/twitter.svg'
import { ReactComponent as GithubIcon } from './icons/github.svg'
import regionData from './regions.json'

function App() {
  const [option, setOption] = useState('fullRegion');
  const regions = regionData[option];
  const [data, setData] = useState();

  function handleChange(e) {
    setRegions(e.target.value);
  }

  useEffect(() => {
    let flag = true;
    fetch('https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?' + new URLSearchParams({
      Authorization: 'CWA-9AB07683-0987-4315-B12C-2C08BB1757C3',
      sort: 'time',
      format: 'JSON'
    }))
      .then(res => res.json())
      .then(data => {
        if (flag) setData(data)
      })
      .catch(error => console.error('Error fetching data:', error));

    return () => {
      flag = false;
    }
  }, [option])

  return (
    <>
    <div className='flex flex-col items-center'>
  
      <div className='banner'>
        <p className='text-5xl text-black my-10 font-bold'>今明日天氣預報</p>
        <Dropdown items={regionData.options} option={regionData.options[option]} setOption={setOption} />
      </div>

      <AnimatePresence mode='wait'>
      <Fragment key={option}>
        {data && regions ? regions.map((region, i) => (
          <Forecast key={region} data={data.records.location.find(element => element.locationName === region)} index={i} />
        )) : null}
      </Fragment>
      </AnimatePresence>
  
    </div>
  
    <div className='credit flex flex-row justify-center items-center h-20 text-[16px]'>
      <p className='text-black mx-1'>Made by iceyic</p>
      <a href="https://github.com/iceyictw" className='mx-1'><GithubIcon /></a>
    </div>
    </>
  )
}

export default App
