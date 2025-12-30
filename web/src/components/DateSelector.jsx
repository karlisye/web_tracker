import React, { useState } from 'react'

const DateSelector = ({ setStartDate, setEndDate, startDate, endDate }) => {
  const [error, setError] = useState('');

  const handleStartDate = (e) => {
    if (endDate && endDate < new Date(e.target.value).toISOString()) {
      setError("Start date can't be after end date");
      return;
    }
    setError('');
    setStartDate(new Date(e.target.value).toISOString());
  }

  const handleEndDate = (e) => {
    if (startDate && startDate > new Date(e.target.value).toISOString()) {
      setError("Start date can't be after end date");
      return;
    }
    setError('');
    const date = new Date(e.target.value);
    date.setHours(23, 59, 59, 999);
    setEndDate(date.toISOString());
  }

  return (
    <div className='flex gap-2'>
      {error && <p className='text-red-500 font-semibold'>{error}</p>}

      <div className='flex gap-2'>
        <label htmlFor="start">Start:</label>
        <input onChange={handleStartDate} id='start' type="date" />
      </div>

      <div className='flex gap-2'>
        <label htmlFor="end">End:</label>
        <input onChange={handleEndDate} id='end' type="date" />
      </div>
    </div>
  )
}

export default DateSelector