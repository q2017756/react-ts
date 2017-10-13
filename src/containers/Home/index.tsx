import * as React from 'react'
import BaseComponent from '../../BaseComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './index.scss'

/** 所有需用到的组件 **/

interface Props {
  actions: any,
}

class Home extends BaseComponent  {

	constructor(props: Props) {
		super(props);
		this.state = {
		}
	}

  componentDidMount() {
		
  }

	render() {
		return (
			<div>
				<div className='page-container'>
					asdf
				</div>
			</div>
		)
	}
}

export default connect(
  (state) => ({
		base: state.base
  }),
  (dispatch) => ({
    actions: bindActionCreators({}, dispatch),
  })
)(Home as any)
