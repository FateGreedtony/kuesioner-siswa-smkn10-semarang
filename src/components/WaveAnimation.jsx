import React from 'react';

export default function WaveAnimation() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div 
        className="absolute bottom-0 w-[200%] h-24 bg-repeat-x opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ffffff' d='M0,100 C300,200 900,0 1200,100 L1200,200 L0,200 Z'%3E%3C/path%3E%3C/svg%3E")`,
          animation: 'wave 8s linear infinite'
        }}
      />

      <div 
        className="absolute bottom-0 w-[200%] h-28 bg-repeat-x opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ffffff' d='M0,120 C400,220 800,20 1200,120 L1200,200 L0,200 Z'%3E%3C/path%3E%3C/svg%3E")`,
          animation: 'wave 16s linear infinite'
        }}
      />
    </div>
  );
}
