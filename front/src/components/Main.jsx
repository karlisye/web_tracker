import { useEffect, useState } from "react";

function Main() {
  const [tab, setTab] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
      const getPageURL = async () => {
          try {
              //get active tab
              const [currentTab] = await chrome.tabs.query({active: true, currentWindow: true})          
              const tabName = new URL(currentTab.url);
              setTab(tabName.hostname)
              setLoading(false) 

              await fetch('http://127.0.0.1:8000/api/store-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: tabName.hostname,
                }),
              });

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
        <p>{ tab }</p>
    </div>
  )
}

export default Main