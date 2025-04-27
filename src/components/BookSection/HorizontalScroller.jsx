import React, { useRef } from 'react';

const HorizontalScroller = ({ children }) => {
  const scrollerRef = useRef(null);
  
  const scrollLeft = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="horizontal-scroller-container">
      <button className="scroll-button left" onClick={scrollLeft}>
        <span className="material-icons">chevron_left</span>
      </button>
      
      <div className="horizontal-scroller" ref={scrollerRef}>
        {children}
      </div>
      
      <button className="scroll-button right" onClick={scrollRight}>
        <span className="material-icons">chevron_right</span>
      </button>
    </div>
  );
};

export default HorizontalScroller;