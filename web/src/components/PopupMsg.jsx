import React, { useEffect } from 'react';

const PopupMsg = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 w-80">
      <div className='text-white px-5 py-4 rounded-xl shadow-xl bg-indigo-400'>
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default PopupMsg;
