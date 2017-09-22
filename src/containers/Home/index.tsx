import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.scss';

/** 所有需用到的组件 **/
import Header from './Components/Header';
import Footer from './Components/Footer'

interface Props {
  actions: any,
}

class Home extends React.Component<any, any>  {

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
				<Header />
				<div className='page-container'>
					{ this.props.children }
				</div>
			   <Footer />
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
)(Home as any);
