import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { fetchSession, getSession, registerUser } from '../../../state/reducers/auth/slice'

import './style.scss'

const RegisterScreen = () => {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [pass, setPass]         = useState('')
  const [passConf, setPassConf] = useState('')
  const navigate                = useNavigate()
  const session                 = useSelector(getSession)
  const dispatch                = useDispatch()

  const handleRegister = () => {
    dispatch(registerUser(name, email, pass))
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSession());
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (session) {fetchSession
      navigate('/boards')
    }
  }, [session])

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        backgroundColor: 'white',
        width: '500px',
        padding: 20,
        borderRadius: 10
      }}>
        <div>
          <div className='mb-4'>
            <h1>Sign up</h1>
          </div>
          <div>
            <Form>
              <FloatingLabel
                label="Your name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={name}
                  onChange={({target}) => setName(target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  value={email}
                  onChange={({target}) => setEmail(target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </FloatingLabel>
              <FloatingLabel
                label="Pasword"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={pass}
                  onChange={({target}) => setPass(target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                label="Confirm password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={passConf}
                  onChange={({target}) => setPassConf(target.value)}
                />
              </FloatingLabel>
              <div className="form-footer">
                <Button variant="primary" onClick={handleRegister}>
                  Create Account
                </Button>
                <Form.Text className="text-muted">
                  Already have an account? <span onClick={() => navigate('/login')}>Click here</span> to login right now!
                </Form.Text>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen