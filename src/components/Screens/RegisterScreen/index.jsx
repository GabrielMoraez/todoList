import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useNavigate } from "react-router-dom"

import './style.scss'
import { useState } from 'react'

const RegisterScreen = () => {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [pass, setPass]         = useState('')
  const [passConf, setPassConf] = useState('')
  const navigate                = useNavigate()

  const handleRegistration = () => {
    console.log(name, email, pass, passConf)
  }

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
                <Button variant="primary" onClick={handleRegistration}>
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