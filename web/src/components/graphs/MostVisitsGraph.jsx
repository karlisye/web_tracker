import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import DateSelector from '../DateSelector';
import ContainerTitle from '../ContainerTitle';

const MostVisitsGraph = () => {
  const [mostVisits, setMostVisits] = useState(null);
  const [sortBy, setSortBy] = useState('all')

  const [isDateSelectorActive, setIsDateSelectorActive] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const getMostVisits = async () => {
    const res = await axios.get('/most-visits', { params: { sortBy, startDate, endDate } });
    setMostVisits(res.data.mostVisits);
  }
  
  useEffect(() => {
    getMostVisits();
  },[sortBy, startDate, endDate]);

  if (!mostVisits) return <p>Loading...</p>

  return (
    <div>
    <ContainerTitle title='Visit Count' text="See how often you visit websites you're registered in." />
    
    <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-10'>
      <div className='flex gap-2 justify-between text-slate-400 items-center my-1'>
        <div className='flex gap-2 items-center'>
          <label htmlFor='pickTime'>Pick time</label>
          <input 
            id='pickTime' 
            type='checkbox' 
            onChange={() => {
              setIsDateSelectorActive(prev => !prev);
              setStartDate(null);
              setEndDate(null);
            }}
            className='py-0.5 px-1 border rounded-md' 
          />
        </div>

        {isDateSelectorActive ? (
          <DateSelector setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} />
        ) : (
          <div>
            <label htmlFor="sortMostVisits">Sort by: </label>
            <select onChange={(e) => setSortBy(e.target.value)} id='sortMostVisits'>
              <option value='all'>All time</option>
              <option value='lastMonth'>Last month</option>
            </select>
          </div>
        )}
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={mostVisits}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="host" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  )
}

export default MostVisitsGraph