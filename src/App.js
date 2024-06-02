import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from './components/Box.js';
import NeumorphicButton from './components/NeumorphicButton.js';

const boxImage = new URL('./assets/images/box.svg', import.meta.url);
const gridImage = new URL('./assets/images/grid.svg', import.meta.url);
const textInputImage = new URL('./assets/images/text_input.svg', import.meta.url);

const componentsMap = {
     Box,
     NeumorphicButton
};


const handleDrop = (item) => {
     console.log('Item dropped:', item);
     // const newDropProps = { ...item };
     // newDropProps[cellIndex] = {
     //      type: ComponentType,
     //      component: <ComponentType props={componentProps} />
     // };
     // setDropProps({ ...newDropProps });
};

const Draggable = ({ id, type, children }) => {
     const [{ isDragging }, drag] = useDrag(() => ({
          type,
          item: { id },
          collect: (monitor) => ({
               isDragging: !!monitor.isDragging(),
          }),
     }));

     return (
          <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
               {children}
          </div>
     );
};

const Droppable = ({ allowedDropType, onDrop, children }) => {
     const [droppedItems, setDroppedItems] = useState([]);

     // {
     //      Object.entries({ ...dropProps }).map(([key, value], ii) => (
     //           i === parseInt(key, 10) ?
     //                <div
     //                     key={ii}
     //                >
     //                     <DynamicComponentRenderer componentName={value.component.type}></DynamicComponentRenderer>
     //                </div> : null
     //      ))
     // }

     const [{ isOver }, drop] = useDrop(() => ({
          accept: allowedDropType,
          drop: (item, monitor) => {
               const didDrop = monitor.didDrop();
               if (!didDrop) {
                    setDroppedItems(prevItems => [...prevItems, item]);
                    onDrop(item);
               }
          },
          collect: monitor => ({
               isOver: !!monitor.isOver({ shallow: true }),
          }),
     }), []);
};

const getAllProps = (Component) => {
     if (!Component) {
          throw new Error(`Component ${Component.type} not found.`);
     }
     const defaultProps = Component.type.defaultProps || {};
     console.log('Component', Component, defaultProps);
     return { ...Component.type, ...Component.children, ...Component.props };
};

const DynamicComponentRenderer = ({ componentName, props, children, propTypes }) => {
     const Component = componentsMap[componentName];
     if (!Component) {
          return <div>Component not found</div>;
     }

     return <Component {...props} {...propTypes} {...children} {...componentProps}></Component>;
};


const App = () => {
     const [dropProps, setDropProps] = useState({});
     const [componentProps, setComponentProps] = useState({}); 
     
     const renderGrid = () => {
          console.log('Marco');
          const grid = [];
          for (let i = 0; i < 15; i++) {
               grid.push(
                    <div
                         key={i}
                         className="grid-item"
                    >
                         <Droppable allowedDropType="BOX" onDrop={handleDrop}>
                              
                              Here
                         </Droppable>
                    </div>
               );
          }
          return grid;
     };

     return (
          <DndProvider backend={HTML5Backend}>
               <div className="app">
                    <div className="app-container">
                         <div className="grid-container">
                              <div style={{ display: 'grid', border: '1px', gridTemplateColumns: 'repeat(12, 12)' }}>
                                   <Droppable allowedDropType="BOX" onDrop={handleDrop}>
                                        Drop components here
                                   </Droppable>
                              </div>
                         </div>
                         <div>
                        
                         {/* <div>
                              <ul className="component-list">
                                   <li draggable onDragStart={(event) => handleDragStart(event, 'Grid')}>
                                        <img src={gridImage} alt="Grid" />
                                   </li>
                                   <li draggable onDragStart={(event) => handleDragStart(event, 'Box')}>
                                        <img src={boxImage} alt="Box" />
                                   </li>
                                   <li draggable onDragStart={(event) => handleDragStart(event, 'TextInput')}>
                                        <img src={textInputImage} alt="Text Input" />
                                   </li>
                                   <li draggable onDragStart={(event) => handleDragStart(event, 'SelectInput')}>
                                        <img src="select-input.svg" alt="Select Input" />
                                   </li>
                              </ul>
                         </div> */}
                         <div>
                              <Draggable id="1" type="BOX">
                                   {// setComponentProps(getAllProps(<Box>Insert Text here</Box>))
                                   }
                                   Box
                              </Draggable>
                              <Draggable id="2" type="BOX">
                                   {// setComponentProps(getAllProps(<NeumorphicButton></NeumorphicButton>))
                                   }
                                   Button
                              </Draggable>
                         </div>
                         <div className="props-div">
                              <strong>{componentProps.type} Properties:</strong>
                              {Object.entries(componentProps).map(([key, value]) => (
                                   <div key={`props_${key}`}>
                                        {typeof value === 'object' /*&& key === 'propTypes'*/ ? 
                                             Object.entries(value).map(([subKey, subValue]) => (
                                                  <div> {subKey} <textarea value={subValue}></textarea></div>))
                                             : <div>{key} <textarea value={value}></textarea></div>
                                        }
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </div>

          </DndProvider>
     )};

export default App;
