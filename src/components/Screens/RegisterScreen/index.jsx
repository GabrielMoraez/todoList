import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useNavigate } from "react-router-dom"

import './style.scss'

const RegisterScreen = () => {
  const navigate = useNavigate()

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
                controlId="name"
                label="Your name"
                className="mb-3"
              >
                <Form.Control type="text" />
              </FloatingLabel>
              <FloatingLabel
                controlId="email"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email"/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </FloatingLabel>
              <FloatingLabel
                controlId="password"
                label="Pasword"
                className="mb-3"
              >
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
              <FloatingLabel
                controlId="password-conf"
                label="Confirm password"
                className="mb-3"
              >
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
              <div className="form-footer">
                <Button variant="primary" type="submit">
                  Create
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