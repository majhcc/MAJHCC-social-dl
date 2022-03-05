import React, { useState, useEffect } from 'react';
function Main() {
  const [isForm, setisForm] = useState(false);
  const [isload, setload] = useState(true);
  const [rrror, setError] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    setload(false);
    setisForm(true);
    var url = `https://api-v1.majhcc.com/api/tk?url=${e.target.elements.url.value}`;
    try {
      
      const data = await fetch(url, {
      "headers": {
      "accept": "application/json"}
      });
      const json = await data.json();
      console.log(json.link);
      if (json.error) {
        setload(true);
        setisForm(false);
        setError(json.error);
        
      } else {
      window.open(json.link, '_blank');
      setload(true);
      setisForm(false);
      setError(null);
      }
    } catch {
      setError('Error');
    }
  }
    
  return (
    <div className="sign-up-form-container bg-white px-8 py-12 rounded-lg shadow-md" >
        <form onSubmit={handleSubmit} hidden={isForm}>
            <div className="flex items-center rounded-lg pb-1">
            <h1 className="text-black text-4xl font-semibold tracking-wide leading-none">TikTok DL</h1>
            </div>
            <div className="flex justify-center items-center rounded-lg py-2">
            <input id="url" type="url" placeholder="URL HERE" required className="w-full bg-gray-100 text-black px-6 py-4 rounded-lg tracking-widest" ></input>
            </div>
            <h1 className="text-red-500 text-xl font-semibold tracking-wide text-center leading-none">{rrror}</h1>
            <div className="flex justify-center items-center rounded-lg pt-2 pb-8">
            <button type="submit" className="sign-up-button w-full transform active:scale-95 bg-blue-500 text-white px-16 py-4 rounded-lg font-bold tracking-widest" >Download</button>
            </div>
        </form>
            <div className="w-16 h-16 border-4 border-blue-400 border-dotted rounded-full animate-spin" hidden={isload}></div>
    </div>
    
  );
}

export default Main;