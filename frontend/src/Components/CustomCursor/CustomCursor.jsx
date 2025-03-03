import { useEffect, useState } from "react";

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const updatePosition = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };
  
      window.addEventListener('mousemove', updatePosition);
      return () => window.removeEventListener('mousemove', updatePosition);
    }, []);
  
    return (
      <div
        style={{
          width: '20px',
          height: '20px',
          border: '2px solid black',
          borderRadius: '50%',
          position: 'fixed',
          top: position.y,
          left: position.x,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      />
    );
  };
  export default CustomCursor