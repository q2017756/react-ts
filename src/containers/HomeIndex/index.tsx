import * as React from 'react'
import BaseComponent from '../../BaseComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './index.scss'

import { add } from '../../store/base/actions'

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
		console.log(this.props)
  }

	render() {
		console.log(this.props.base)
		return (
			<div className='home-index'>
        <img alt='darkness' className='logo' src={Logo} />
				<h4 className='title'>React Darkness</h4>
				<p onClick={this.add}>React、Redux、Router、Webpack、TypeScript、Tslint</p>
			</div>
		);
	}

	add = () => {
		this.props.actions.add()
	}
}

export default connect(
  (state) => ({
		base: state.base
  }),
  (dispatch) => ({
    actions: bindActionCreators({ add }, dispatch),
  })
)(HomeIndex as any)
