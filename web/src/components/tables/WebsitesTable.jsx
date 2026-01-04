import axios from 'axios';
import React, { useEffect } from 'react'

const WebsitesTable = () => {

  useEffect(() => {
    const getUsersWebsites = async () => {
      const res = await axios.get('/websites');
      console.log(res);
    }
    getUsersWebsites();
  },[]);

  return (
    <div>WebsitesTable</div>
  )
}

export default WebsitesTable