
/* Global Variables */
const key = "75a3998c44142976647864fe7d932d16";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById("generate").addEventListener("click", newEntry);

function newEntry(){
    let zipcode = document.querySelector("#zip").value;
    let feeling = document.getElementById('feelings').value;
    console.log(zipcode);
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${key}`;
    newWeather(url)
    .then(function(data){
        console.log(data);
        postNew('/allData', {date:newDate , temp:data.main.temp , feel:feeling , })
        .then(refreshUI());
    } );
}
const newWeather = async (url)=>{
    const res= await fetch(url)
    try{
        const apiData = await res.json();
        //console.log(apiData.main.temp);
        return apiData;
    }
    catch(err){
        console.log("error",error);
    }
}
    
const postNew = async (url='', data={}) =>{
    const resp= await fetch(url,{
        method: "POST",
        credentials: "same-origin",
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data), 
    });
    try{
    const newData= await resp.json();
    //console.log(newData);
    return newData;
    }catch(err){console.log('error',err);}
};

const refreshUI = async ()=>{
    const newdata= await fetch("/allData");
    try{
        const data= await newdata.json();
        document.getElementById("date").innerHTML= "date: "+data[data.length-1].date;
        document.getElementById("temp").innerHTML= "temp: "+data[data.length-1].temp;
        document.getElementById("content").innerHTML= "feels: "+data[data.length-1].feel;
    }
    catch(err){
        console.log("error:", err);
    }
}
