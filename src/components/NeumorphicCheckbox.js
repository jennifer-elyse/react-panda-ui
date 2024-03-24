import React from 'react';
import { Checkbox } from 'react-aria-components';

export default function NeumorphicCheckbox({ children, ...props }) {
  return (
    <>
      <style>
        {`
          [role="checkbox"] {
            width: 100px;
            height: 100px;
            background-color: #f0f0f0;
            border-radius: 5px;
            position: relative;
            box-shadow: inset 2px 2px 3px rgba(0, 0, 0, 0.2), inset -2px -2px 3px rgba(255, 255, 255, 0.7);
          }
          
          [role="checkbox"][aria-checked="true"]::before {
            content: '';
          }
          
          [role="checkbox"][aria-checked="true"]::after {
            content: '';
          }
          
          [role="checkbox"]:hover {
            cursor: pointer;
          }

          .checkmark__check {
            margin: auto;
            width: 30px;
            height: 30px;
            fill: #555;
            filter: drop-shadow(-1px -2px 1px rgb(0 0 0 / 0.85)) drop-shadow(0px 1px 0px #fff);
          }
        `}
      </style>
      <div className="p4">
        <label className="flex items-center cursor-pointer">
          <Checkbox
            {...props}
            >
            <div 
              // role="checkbox"
              className="py-4 px-4 rounded-lg shadow-neumorphic hover:outline hover:outline-2 hover:outline-solid hover:outline-turquoise outline-offset-[-4px]"
              aria-checked="true">
	              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" class="checkmark__check"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
              </div>
          </Checkbox>    
            {children}
        </label>
      </div>
    </>
  );
}
