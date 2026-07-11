import React from 'react';

function Loading() {

  return (

    <div className='flex items-center justify-center min-h-[60vh]'>

      <div
        className='
          h-14
          w-14
          rounded-full
          border-4
          border-blue-200
          border-t-blue-600
          animate-spin
        '
      />

    </div>
  );
}

export default Loading;