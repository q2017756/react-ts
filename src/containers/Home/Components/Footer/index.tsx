import * as React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

interface Props {

}

class Footer extends React.Component {
	constructor(props: Props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<footer className='footer'>
			   React Darkness
			</footer>
		);
	}
}

export default Footer;
