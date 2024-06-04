import { useReducer } from 'react';

const reducer = (state, action) => {

}

export const useAppState = () => {
     return useReducer(reducer, initialState);
};

const initialState = [
     {
          type: 'box',
          props: { padding: 20 },
          x: 0,
          y: 0,
          children: [
               {
                    type: 'box',
                    props: { padding: 20 },
                    x: 1,
                    y: 1,
                    children: [
                         {
                              type: 'button',
                              props: { label: 'Click Me', width: 200 },
                              children: null
                         },
                         {
                              type: 'button',
                              props: { label: 'Click Me Too', width: 200 },
                              children: null
                         }
                    ]
               }
          ]
     }
]