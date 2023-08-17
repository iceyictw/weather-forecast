import { useState, useEffect, useRef } from  'react'

function Dropdown({items, option, setOption}) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button
      onClick={() => setIsOpen(prev => !prev)}
      className="w-[340px] p-3 m-0 
        flex items-center justify-between 
        font-bold text-lg rounded-lg
        bg-white border-4 border-transparent hover:border-gray-500 duration-100"
      >
        {option}
      </button>

      {isOpen && (
        <div className='dropdownList'>
          {Object.entries(items).map(([key, value]) => (
            <div
            key={key}
            className='w-full h-[90px] bg-gray-200 hover:bg-orange-100 hover:border-l-4 border-zinc-900 select-none duration-100'
            onClick={() => {
              setIsOpen(false);
              setOption(key);
            }}>
              <p className='m-4 font-bold'>{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;