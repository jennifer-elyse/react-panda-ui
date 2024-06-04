import React from 'react';
import PropTypes from 'prop-types';

export default function Box({ children, direction = 'row', justify = 'center', align = 'center', padding = '2px', className = '', handleDrop, ...props }) {
  const flexClasses = `flex flex-${direction} justify-${justify} items-${align} ${className}`;
  return (
    <div 
        className={`${flexClasses} border`} 
        {...props}
        onDrop={(event) => handleDrop(event, props)}
        onDragOver={(event) => event.preventDefault()}>
      {children}
      </div>
  );
}

Box.propTypes = {
     children: PropTypes.any,
     className: PropTypes.string,
     justify: PropTypes.string,
     align: PropTypes.string,
     padding: PropTypes.string,
     // message: PropTypes.string.isRequired,
};