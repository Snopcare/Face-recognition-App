import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
	console.log(box);
	return (
		<div className='center ma'>
		   		<div className='absolute mt2'>
		   		    <div className='bluebox'>
						<img id='inputimage' alt="" src={imageUrl} width='500px' height='auto'/>
				  		<div className='bounding-box' style={{
				  			top: box.topRow, 
				  			right: box.rigthCol, 
				  			bottom: box.bottomRow, 
				  			left: box.leftCol,
				  		}}>
				  			
				  		</div>
	  				</div>
	  			</div>
	  	</div>
			);
}

export default FaceRecognition;