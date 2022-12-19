import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import Brain from './Brain.png'

const Logo = () => {
	return (
		<div className='ma4 mt0'>
				<Tilt className='Tilt' style={{height:250, width: 250 }}>
				<div className="Tilt-inner pa3">
				<img alt='logo' src={Brain}/>
				</div>
    			</Tilt>
  		</div>
	);
}

export default Logo;