import React, {  useState,useEffect } from 'react'
import { Card,Input,Select } from 'antd';


function Crypt() {
  const defaultValue1 = "BitCoin";
  const defaultValue2 = "Ether";
  const [inputValue,setInputValue] = useState("0");
  const[firstSelectValue,setFirstSelectValue] = useState(defaultValue1);
  const[secondSelectValue,setSecondSelectValue] = useState(defaultValue2);
  const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";
  const [coinList, setCoinList] = useState([]);
  const [result, setResult] = useState("0");
 
  useEffect(()=>{
    fetchData()
  },[]);
    useEffect(()=>{
   if(coinList.length===0)return;
    const firstRate = coinList.find((i)=>{
      return i.value === firstSelectValue;
    }).rate
    const secondRate = coinList.find((i)=>{
      return i.value === secondSelectValue;
    }).rate
      const r = (inputValue*secondRate)/firstRate;
      setResult(r)

  },[inputValue,firstSelectValue,secondSelectValue])


  async function fetchData(){
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    console.log(jsonData.rates);
    
    const arrayData = [];
    await Object.entries(jsonData.rates).forEach((i)=>{
      const tempObj = {
              value:i[1].name,
              label:i[1].name,
              rate:i[1].value
      }
      arrayData.push(tempObj);
    });
    console.log(arrayData);
    setCoinList(arrayData);
    

    // console.log(coinList[1]);
  }
 
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center",alignContent:"center", marginTop:"30vh"}}>
        <Card
    title={<h1>Crypto Converter</h1>}
    bordered={false}
    style={{
      width: 500,
      height:300
    }}
  >
   <Input style={{height:30}} onChange={(e)=>{setInputValue(e.target.value)}} placeholder="Enter Number" />
    <div style={{display:"flex", justifyContent:"space-around", marginTop:"20px"}}>
    <Select
      defaultValue="--Select--"
      style={{ width: 200 }}
      onChange={(value)=>{setFirstSelectValue(value)}}
      options={coinList}
    />
        <Select
      defaultValue="--Select--"
      style={{ width: 200 }}
      onChange={(value)=>{setSecondSelectValue(value)}}
      options={coinList}
    />
    </div>
    <p >{inputValue} {firstSelectValue} = {result} {secondSelectValue}</p>
  </Card>
    </div>
  )
}

export default Crypt