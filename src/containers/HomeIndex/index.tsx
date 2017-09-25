import * as React from 'react'
import BaseComponent from '../../BaseComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './index.scss'

const Logo = `${require( '../../public/images/logo.jpg')}`

interface Props {
  actions: any,
}

class HomeIndex extends BaseComponent {
	constructor(props: Props) {
		super(props)
		this.state = {
		}
	}

	componentDidMount() {

  }

	render() {
		return (
			<div className='home-index'>
        <img alt='darkness' className='logo' src={Logo} />
				<h4 className='title'>React Darkness</h4>
				<p>React、Redux、Router、Webpack、TypeScript、Tslint</p>
			</div>
		);
	}
}

export default connect(
  (state) => ({

  }),
  (dispatch) => ({
    actions: bindActionCreators({}, dispatch),
  })
)(HomeIndex as any)
