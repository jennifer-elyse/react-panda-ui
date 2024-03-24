import React, { Suspense, useRef } from 'react';

import DefaultLayout from '../components/layouts/DefaultLayout';
import Box from '../components/Box';
import NeumorphicButton from '../components/NeumorphicButton';
import NeumorphicCheckbox from '../components/NeumorphicCheckbox';

export default function Home() {
	let [showFileUpload, setShowFileUpload] = React.useState(false);
	const toggleFileUpload =  () => {setShowFileUpload(!showFileUpload)}
	return (
		<DefaultLayout>
			<Box className="px-5">
				<Box  className="px-5">
					<NeumorphicButton>Press Me</NeumorphicButton>
				</Box>
				<Box  className="px-5">
					<NeumorphicCheckbox ></NeumorphicCheckbox>
				</Box>
				<Box  className="px-5">
					
				</Box>
					
			</Box>
		</DefaultLayout>
	);
}