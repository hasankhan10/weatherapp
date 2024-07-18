
import { useRef, useState } from "react";
interface WeatherData {
    temparature:string;
    tempmood:string;
    tempmoodimg:string;
    location:string;
    region:string;
    country:string;
    localtime:string;
    windspeed:string;
    humadity:string;
    feelslike:string;
}
function Weather() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [weatherData, setWeatherData] =useState<WeatherData>({
        temparature:"",
        tempmood:"",
        tempmoodimg:"",
        location:"",
        region:"",
        country:"",
        localtime:"",
        windspeed:"",
        humadity:"",
        feelslike:""
    })
    const handleApi = async()=>{
    
        const inputValue = inputRef.current?.value;

        if(inputValue){
            try {
                const response =  await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue}?unitGroup=metric&key=F7WU8NTGTJKUPXECQE8QUL7K6&contentType=json`)
                const data = await response.json()    
                console.log(data);
                const getData:WeatherData = {
                    temparature:data.currentConditions.temp.toString(),
                    tempmood:data.currentConditions.conditions,
                    tempmoodimg:data.currentConditions.icon,
                    location:data.address,
                    region:data.resolvedAddress.split(",")[1],
                    country:data.resolvedAddress.split(",")[2],
                    localtime:data.currentConditions.datetime,
                    windspeed:data.currentConditions.windspeed,
                    humadity:data.currentConditions.humidity,
                    feelslike:data.currentConditions.feelslike
                }
                setWeatherData(getData)
                if(inputRef.current){
                    inputRef.current.value = "";
                }
                
            } catch (error) {
                alert("Plaese enter valid location or big Area/city.😊")
                if(inputRef.current){
                    inputRef.current.value = "";
                }
            }
        }
        
    }
  return (
    <div className="weather w-[550px] h-[400px] flex flex-col gap-2 mx-5">
        <section className="search w-full h-fit flex justify-center items-center gap-6">
            <input className=" w-[60%] h-10 outline-none px-2 py-2 rounded-md text-center" placeholder="Enter Location" type="text" ref={inputRef} />
            <button onClick={handleApi} className=" px-2 py-2 bg-blue-600 rounded-md" >Check</button>
        </section>
        <div className="wetherdata w-full h-fit bg-yellow-400 rounded-md sm:py-6 py-10">
            <div className="currenttemp w-full h-[50%] flex">
                <h1 className=" w-1/2 h-full sm:text-7xl text-5xl font-semibold flex justify-center items-center">{weatherData.temparature} <sup>o</sup>C</h1>
                <section className="w-1/2 h-full flex justify-center items-center flex-col">
                    <p className="text-center text-2xl font-semibold">{weatherData.tempmood}</p>
                    <img className=" w-[60%] h-[70%] object-fill" src={weatherData.tempmoodimg} alt="wether img" />
                </section>
            </div>
            <div className="otherdetails w-full h-[50%] flex text-xl">
                <section className=" w-[60%] h-full px-5 py-2">
                    <ul>
                        <li><span className=" font-bold">Location:</span> {weatherData.location}</li>
                        <li><span className=" font-bold">Region:</span> {weatherData.region}</li>
                        <li><span className=" font-bold">Country:</span> {weatherData.country}</li>
                        <li><span className=" font-bold">Last Time:</span> {weatherData.localtime}</li>
                    </ul>
                </section>
                <section className=" w-[40%] h-full py-2">
                    <ul>
                        <li><span className=" font-bold">Wind Speed:</span> {weatherData.windspeed}</li>
                        <li><span className=" font-bold">humidity:</span> {weatherData.humadity}</li>
                        <li><span className=" font-bold">feelslike:</span> {weatherData.feelslike}</li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Weather