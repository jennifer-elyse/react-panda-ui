import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Box from './components/Box.js';
import NeumorphicButton from './components/NeumorphicButton.js';


const boxImage = new URL('./assets/images/box.svg', import.meta.url);
const gridImage = new URL('./assets/images/grid.svg', import.meta.url);
const textInputImage = new URL('./assets/images/text_input.svg', import.meta.url);

const App = () => {
     const [dropProps, setDropProps] = useState({});
     const [componentProps, setComponentProps] = useState({});


     const componentsMap = {
          Box,
          NeumorphicButton
     };


     const getAllProps = (Component) => {
          if (!Component) {
               throw new Error(`Component ${Component.type} not found.`);
          }
          const defaultProps = Component.type.defaultProps || {};
          console.log('Component', Component, defaultProps);
          return { ...Component.type, ...Component.children, ...Component.props };
     }

     const DynamicComponentRenderer = ({ componentName, props, children, propTypes }) => {
          const Component = componentsMap[componentName];
          if (!Component) {
               return <div>Component not found</div>;
          }

          return <Component {...props} {...propTypes} {...children} {...componentProps}></Component>;
     };

     const handleDrop = async (event, cellIndex) => {
          event.preventDefault();
          const ComponentType = event.dataTransfer.getData('component');

          // Add the component to the grid cell
          // setComponentProps(await getAllProps(<DynamicComponentRenderer componentName={ComponentType}></DynamicComponentRenderer>));
          switch (ComponentType) {
               case 'Box':
                    setComponentProps(getAllProps(<Box>Insert Text here</Box>));
                    break;
               case 'Button':
                    setComponentProps(getAllProps(<Button>Press Me</Button>));
                    break;
               default:
                    setComponentProps(getAllProps(<Box>What'd You Drop?</Box>));
                    break;
          }
          const newDropProps = { ...dropProps };
          newDropProps[cellIndex] = {
               type: ComponentType,
               component: <ComponentType props={componentProps} />
          };
          setDropProps({ ...newDropProps});
     };

     const handleDragStart = (event, ComponentType) => {
          event.dataTransfer.setData('component', ComponentType);
     };

     const renderGrid = () => {
          const grid = [];
          for (let i = 0; i < 144; i++) {
               grid.push(
                    <div
                         key={i}
                         className="grid-item"
                         onDrop={(event) => handleDrop(event, i)}
                         onDragOver={(event) => event.preventDefault()}
                    >
                         {Object.entries({ ...dropProps }).map(([key, value], ii) => (
                              i === parseInt(key, 10) ? 
                                   <div 
                                        key={ii}
                                   >
                                        <DynamicComponentRenderer componentName={value.component.type}></DynamicComponentRenderer>
                                   </div> : null
                         ))}
                    </div>
               );
          }
          return grid;
     };

     return (
          <div className="app">
               <div className="app-container">
                    <div className="grid-container">{renderGrid()}</div>
                    <div>
                         <div>
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
     );
};

export default App;
