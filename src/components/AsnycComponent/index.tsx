import * as React from 'react'
import BaseComponent from '../../BaseComponent'
import { Link } from 'react-router-dom'

interface Props {

}

export default function asyncComponent(importComponent) {
	class AsyncComponent extends BaseComponent {
		constructor(props: Props) {
			super(props)

			this.state = {
				component: null
			}
		}

		async componentDidMount () {
			const {component} = await importComponent()

			this.setState({
				component
			})
		}

		render () {
			const C = this.state.component
			return C ? <C {...this.props} /> : null
		}
	}

	return AsyncComponent
}

