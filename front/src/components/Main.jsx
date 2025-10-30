import { useEffect, useState } from "react";

function Main() {
  const [tab, setTab] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
      const getPageURL = async () => {
          try {
              //get active tab
              const currentTab = await chrome.tabs.query({active: true, currentWindow: true})
              setTab(currentTab)
              setLoading(false) 
          } catch (error) {
              console.error('Error: ',error)
          }
      }
      getPageURL()
  },[])

  if(loading) return <p>Loading...</p>

  return (
    <div className="border p-2 flex gap-2">
        <h3>Current Website: </h3>
        <p>{ tab[0].url }</p>
    </div>
  )
}

export default Main