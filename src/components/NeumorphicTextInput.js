import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Label, Input, FieldError, Text } from 'react-aria-components';

export default function NeumorphicTextInput({ label, description,  errorMessage, validation, ...props}) {

     return (
          <div className="p4"
               onDrop={(event) => props.handleDrop(event, props)}
               onDragOver={(event) => event.preventDefault()}>
                    <label className="flex items-center cursor-pointer">
                         <div>
                              <TextField {...props}>
                                   <Label>{label}</Label>
                                   <Input
                                        className="py-4 px-4 rounded-lg shadow-neumorphic hover:outline hover:outline-2 hover:outline-solid hover:outline-turquoise outline-offset-[-4px]" />
                                   {description && <Text slot="description">{description}</Text>}
                                   <FieldError>{errorMessage}</FieldError>
                              </TextField>
                         </div>
                    </label>
               </div>
     );
}
