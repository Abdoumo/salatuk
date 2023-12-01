import { Input, Button } from 'antd';
import React, { useState, useEffect, useContext } from 'react'
import './API.css'
import { AppContext } from '../App';

const API = () => {
  const { setData } = useContext(AppContext) 
  const [ country, setCountry ] = useState('Algeria');
  const [ willaya, setWillaya ] = useState('annaba');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayerTime, setNextPrayerTime] = useState('');
  const [prayerTimes, setprayerTimes] = useState([]);



  const [ ip, setip ] = useState('');
  const adanAudio = new Audio('src/assets/9.mp3'); 
  
  var Url = `https://api.aladhan.com/v1/timingsByCity/${(new Date().toLocaleDateString('en-GB').replaceAll('/','-'))}?city=${willaya}&country=${country}&method=99`;
  useEffect(() => {
  
    fetch(Url).then((res) =>res.json()).then(data => {
      setData(data.data)
      if (data.data){
        let d= []
        Object.keys(data.data["timings"]).map(ele => {

          d.push({name: ele, time:data.data["timings"][ele]})
        })
        
        setprayerTimes(d)
      }
    }).catch(err => console.error(err))
  },[ Url , ip  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      const nextPrayer = prayerTimes.find((prayer) => {
        const [prayerHour, prayerMinute] = prayer.time.split(':');
        return (
          currentHour < parseInt(prayerHour) ||
          (currentHour === parseInt(prayerHour) && currentMinutes < parseInt(prayerMinute))
        );
      });

      if (nextPrayer) {
        setNextPrayerTime(nextPrayer.time);

        const [nextPrayerHour, nextPrayerMinute] = nextPrayer.time.split(':');
        if (
          currentHour === parseInt(nextPrayerHour) &&
          currentMinutes === parseInt(nextPrayerMinute)
        ) {
          adanAudio.play(); // Play the audio when the prayer time arrives
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [adanAudio, prayerTimes]);

  const calculateCountdown = () => {
    const now = new Date();
    const targetTime = new Date(now);
    const [hours, minutes] = nextPrayerTime.split(':');
    targetTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const difference = targetTime.getTime() - now.getTime();
    const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);

    return `${minutesLeft} minutes ${secondsLeft} seconds`;
  };

    

        

        
  return (
    <div className="prayer-container">
      <h2 className="current-time">Current Time: {currentTime.toLocaleTimeString()}</h2>
      <h2 className="next-prayer">Next Prayer Time: {nextPrayerTime}</h2>
      <h2 className="countdown">Countdown to Next Prayer: {calculateCountdown()}</h2>
    </div>
  );
}

export default API
