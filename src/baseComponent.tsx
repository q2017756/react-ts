import * as React from 'react'
import { shallowEqualImmutable } from 'react-immutable-render-mixin'

export class BaseComponent extends React.Component<any, any> {

  public getClassName() {
    return (this.constructor as any).name
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqualImmutable(this.props, nextProps) || !shallowEqualImmutable(this.state, nextState)
  }

}

export default BaseComponent
