import React,{useEffect,useState}from'react';import{createRoot}from'react-dom/client';import'./style.css';const API='http://localhost:3002/api';
function App(){
 const[city,setCity]=useState('Mumbai'),[data,setData]=useState(null),[history,setHistory]=useState([]),[error,setError]=useState('');
 async function load(){const r=await fetch(`${API}/weather/history`);if(r.ok)setHistory(await r.json())}
 async function search(e){e?.preventDefault();setError('');const r=await fetch(`${API}/weather?city=${encodeURIComponent(city)}`);const d=await r.json();if(!r.ok)return setError(d.message||'Request failed');setData(d);load()}
 useEffect(()=>{search()},[]);
 return <main className="shell"><header><span>FULL-STACK PROJECT</span><h1>Weather Dashboard</h1><p>React + TypeScript + NestJS + Express + PostgreSQL + Open-Meteo REST APIs</p></header>
 <form onSubmit={search} className="search"><input value={city} onChange={e=>setCity(e.target.value)}/><button>Search</button></form>{error&&<div className="error">{error}</div>}
 {data&&<section className="card hero"><div><small>LIVE PROVIDER DATA</small><h2>{data.city}, {data.country}</h2><div className="temp">{Math.round(data.temperature)}°C</div><p>{data.condition}</p></div><div className="metrics"><div>Humidity<b>{data.humidity}%</b></div><div>Wind<b>{data.windSpeed} km/h</b></div></div></section>}
 <section className="card"><h2>Search History</h2>{history.map(h=><div className="row" key={h.id}><span>{h.city}</span><span>{h.condition}</span><span>{Math.round(h.temperature)}°C</span></div>)}</section></main>
}
createRoot(document.getElementById('root')).render(<App/>);
