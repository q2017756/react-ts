import * as React from 'react'
import BaseComponent from '../../BaseComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './index.scss'

import { Button } from 'antd'

interface Props {
  base: any;
  actions: any;
}

class Use extends BaseComponent {

  constructor(props: Props) {
    super(props)
    this.state = {
    };
  }

  componentDidMount() {

  }

  onAddOne() {
    // this.props.actions.addone();
  }

  render() {
    return (
      <div className='page-use'>
        user
      </div>
    )
  }
}

export default connect(
  (state) => ({
    base: state.base,
  }),
  (dispatch) => ({
    actions: bindActionCreators({  }, dispatch),
  })
)(Use as any)
