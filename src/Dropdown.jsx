import { useState, useEffect, useRef } from  'react'

function Dropdown({items, option, setOption}) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-[200px]">
      <button
      onClick={() => setIsOpen(prev => !prev)}
      className="w-[340px] p-3 m-0 
        flex items-center justify-between 
        font-bold text-lg rounded-lg
        bg-blue-400 hover:bg-blue-300 border-4 border-transparent active:border-white duration-100 active:text-white"
      >
        {option}
      </button>

      {isOpen && (
        <div className='absolute top-36 flex flex-col h-[300px] w-[340px] overflow-y-scroll'>
          {items.map(item => (
            <div
            key={item}
            className='w-full h-[90px] bg-blue-400 hover:bg-blue-300 hover:border-l-4 border-white select-none duration-100'
            onClick={() => {
              setIsOpen(false);
              setOption(item);
            }}>
              <p className='m-4 font-bold'>{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;