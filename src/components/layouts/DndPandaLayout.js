import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { components  } from '../../utils/components';
// import { useAppState } from '../../utils/useAppState';

const boxImage = new URL('../../assets/images/box.svg', import.meta.url);
const gridImage = new URL('../../assets/images/grid.svg', import.meta.url);
const textInputImage = new URL('../../assets/images/text_input.svg', import.meta.url);
const buttonImage = new URL('../../assets/images/box.svg', import.meta.url);

const DndPandaLayout = ({ props }) => {
  const [dropProps, setDropProps] = useState({});
  const [componentProps, setComponentProps] = useState({});

  // const [appState, dispatch] = useAppState();



  const getAllProps = (Component) => {
    if (!Component) {
      throw new Error(`Component ${Component.type} not found.`);
    }
    console.log('Component', Component);
    const defaultProps = Component.type.defaultProps || {};
    console.log('Component', Component, defaultProps);
    console.log('Test');
    return { ...Component.type, ...Component.children, ...Component.props };  
  }

  const DynamicComponentRenderer = ({ componentType, x, y, props, children, propTypes }) => {
    const Component = components[componentType].component;

    if (!Component) {
      return <div>Component not found</div>;
    }
 
    return (
      <Component 
        {...props} 
        x={x} 
        y={y} 
        proptypes={propTypes}  
        {...componentProps}
        componentType={componentType} 
        onDrop={handleDrop}
        newfuckinthing="wtf">
        {children && children.map(({ componentType, props, children }, i) => {
          return (
            <DynamicComponentRenderer
              componentType={componentType}
              props={props}
              x={x}
              y={y}
              children={children}
              key={String(i)}
              onDrop={handleDrop}
            >
            </DynamicComponentRenderer>
          );
        })}
      </Component>
    );
  };

  const handleDrop = async (event, cellIndex) => {
    event.preventDefault();
    event.stopPropagation();
    const ComponentType = components[event.dataTransfer.getData('component')].type;
    const Component = components[event.dataTransfer.getData('component')].component;
    const Box = components['box'].component;

    // Add the component to the grid cell
    switch (ComponentType) {
      case 'box':
        setComponentProps(getAllProps(<Component onDrop={handleDrop}>Insert Text here</Component>));
        break;
      case 'button':
        setComponentProps(getAllProps(<Component>Press Me</Component>));
        break;
      case 'textinput':
        setComponentProps(getAllProps(<Component label="Enter Label"></Component>));
        break;
      case 'checkbox':
        setComponentProps(getAllProps(<Component>Press Me</Component>));
        break;
      default:
        setComponentProps(getAllProps(<Box>What'd You Drop?</Box>));
        break;
    }
    const newDropProps = { ...dropProps };
    newDropProps[cellIndex] = {
      type: ComponentType,
      component: <ComponentType
        onDrop={handleDrop}
        props={componentProps} />
    };
    setDropProps({ ...newDropProps });
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
                <DynamicComponentRenderer 
                    componentType={value.component.type} 
                    x={i} 
                    y={ii}
                    key={String(i).concat(ii)}
                  ></DynamicComponentRenderer>
               : null
          ))}
        </div>
      );
    }
    return grid;
  };

  return (
  <div id="outer-container" style={{ height: '100%' }}>
    <main id="page-wrap">
      <div className="mt-0">
        <h1 className="text-4xl">Panda-React-UI</h1>
      </div>
        <div>
          <div className="app">
            <div className="app-container">
              <div className="grid-container">{renderGrid()}</div>
              <div>
                <div className="component-list-container">
                  <ul className="component-list">
                    <li>
                      <img draggable onDragStart={(event) => handleDragStart(event, 'box')} src={boxImage} alt="Box" />
                    </li>
                    <li>
                      <img draggable onDragStart={(event) => handleDragStart(event, 'textinput')} src={boxImage} alt="Text Input" />
                    </li>
                    <li>
                      <img draggable onDragStart={(event) => handleDragStart(event, 'button')} src={buttonImage} alt="Button" />
                    </li>
                    <li>
                      <img draggable onDragStart={(event) => handleDragStart(event, 'checkbox')} src={buttonImage} alt="Checkbox" />
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
      </div>
    </main>
  </div>
  );
};

export default DndPandaLayout;