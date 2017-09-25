import { Button, Form, Icon, Input, message } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import BaseComponent from '../../../../BaseComponent'
import './Login.scss'
const FormItem = Form.Item

import Debug from 'debug'
const debug = Debug('app.Home.Login')

import { postUserLogin } from '../../../../store/base/actions'

const STATUS_SUCCESS = 200

interface Props {
}

class Login extends BaseComponent{

  constructor(props: Props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  componentWillMount() {
    
  }


  public render() {
    const me = this
    const { getFieldDecorator } = me.props.form
    const { actions, base } = me.props

    return (
      <div className='login'>
        <Form onSubmit={handleSubmit}>
          <FormItem>
            {
              getFieldDecorator('email', {
                rules: [ { required: true, message: 'Please input your username!' } ],
              })(
                  <Input prefix={<Icon type='user' style={{ fontSize: 16 }} />} placeholder='Emali or Shinezone ID' />,
                )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {
                rules: [ { required: true, message: 'Please input your Password!' } ],
              })(
                  <Input prefix={<Icon type='lock' style={{ fontSize: 16 }} />} type='password' placeholder='Password' />,
                )
            }
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit' loading={me.state.loading} style={{ width: '100%', marginBottom: '16px', background: '#2DA2DA' }}>Log In</Button>
          </FormItem>
        </Form>
      </div>
      )

    function handleSubmit(e: any){
      e.preventDefault()
      me.props.form.validateFields((err, values) => {
        if (!err) {
          // setLoading(true)
          actions.postUserLogin(values.email, values.password)
            .then((res: any) => {
              if (res.response.statusCode === STATUS_SUCCESS) {
                message.success('Login success!')
                setTimeout(() => {
                  me.props.history.push('/use')
                }, 1000) // tslint:disable-line
              }
              setLoading(false)
            })
        }
      })
    }

    function setLoading(value: boolean) {
      me.setState({
        loading: value,
      })
    }
  }
}

const WrappedLoginForm = Form.create()(Login)

export default connect(
  // bind state
  (state) => ({
    base: state.base,
    common: state.common,
  }),
  // bind dispatch action
  (dispatch) => ({
    actions: bindActionCreators({ postUserLogin, }, dispatch),
  }),
)(WrappedLoginForm as any)
