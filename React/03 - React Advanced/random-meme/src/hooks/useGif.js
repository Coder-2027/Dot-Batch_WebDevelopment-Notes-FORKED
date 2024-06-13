import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';


const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
//it would be better if we first write our code as usual and then convert it into custom hook

const useGif = (tag) => {                          //on basis of tag we will decide from where call is madeeither from random file or tag file
  const [gif, setGif] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchData(tag) {                        //we are supplying tag variable here also because it is also being called exclusively
    setLoading(true);
    
    const {data} = await axios.get(tag ? `${url}&tag=${tag}`  : url);
    const imageSource = data.data.images.downsized_large.url;
    setGif(imageSource);
    setLoading(false);
  }
  
  
  useEffect( () => {
    fetchData('car');
  },[] )

  return {gif, loading, fetchData};
};

export default useGif;
