import * as React from 'react'
import BaseComponent from 'g-src/BaseComponent'
import { Link } from 'react-router-dom'
import './index.scss'

interface Props {

}

class Footer extends BaseComponent {
	constructor(props: Props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<footer className='footer'>
			   React Shinezone ts
			</footer>
		)
	}
}

export default Footer
