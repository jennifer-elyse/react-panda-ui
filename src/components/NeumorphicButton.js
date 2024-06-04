import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-aria-components';
const colors = require('tailwindcss/colors');


export default function NeumorphicButton({ children, ...props }) {
  return (
  <>
    <style>
      {`
        .button__text {
          margin: auto;
          fill: #555;
          filter: drop-shadow(-0.25px -1px 0.5px rgb(0 0 0 / 0.425)) drop-shadow(0px 0.5px 0px #fff);
        }
      `}
    </style>
      <div className="p2"
        onDrop={(event) => props.handleDrop(event, props)}
        onDragOver={(event) => event.preventDefault()}>
      <Button
        {...props}
        className="bg-white text-turquoise font-bold py-2 px-4 rounded-lg shadow-neumorphic focus-visible:outline focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-turquoise outline-offset-[-4px]"
      >
          {children}
      </Button>
    </div>
    </>
  );
}