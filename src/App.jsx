import { useEffect, useState } from 'react'
import Forecast from './Forecast.jsx'
import Dropdown from './Dropdown.jsx'
import { ReactComponent as TwitterIcon } from './icons/twitter.svg'
import { ReactComponent as GithubIcon } from './icons/github.svg'

const regions = [
  '嘉義縣',
  '嘉義市',
  '新竹縣',
  '新竹市',
  '新北市',
  '臺北市',
  '臺南市',
  '宜蘭縣',
  '苗栗縣',
  '雲林縣',
  '花蓮縣',
  '臺中市',
  '臺東縣',
  '桃園市',
  '南投縣',
  '高雄市',
  '金門縣',
  '屏東縣',
  '基隆市',
  '澎湖縣',
  '彰化縣',
  '連江縣',
]

function App() {
  const [region, setRegion] = useState('臺北市');
  const [data, setData] = useState();

  function handleChange(e) {
    setRegion(e.target.value);
  }

  useEffect(() => {
    let flag = true;
    fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?' + new URLSearchParams({
      Authorization: 'CWB-A514BCEC-F669-445D-A252-B1D485ADE0AC',
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
  }, [region])

  return (
    <>
    <Dropdown items={regions} option={region} setOption={setRegion} />
    {data ? <Forecast data={data.records.location.find(element => element.locationName === region)}/> : null}
    <div className='credit flex flex-row justify-center items-center h-36 text-[16px]'>
      <p className='text-white mx-1'>Made by Icelin</p>
      <a href="https://twitter.com/icelin1717" className='mx-1'><TwitterIcon /></a>
      <a href="https://github.com/Icelin1717" className='mx-1'><GithubIcon /></a>
    </div>
    </>
  )
}

export default App
