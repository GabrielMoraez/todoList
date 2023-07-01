import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

import './style.scss'
import { useNavigate } from "react-router-dom"

const LoginScreen = () => {
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
            <h1>Login</h1>
          </div>
          <div>
            <Form>
              <FloatingLabel
                controlId="email"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" />
              </FloatingLabel>
              <FloatingLabel
                controlId="passord"
                label="Password"
                className="mb-3"
              >
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
              <div className="form-footer">
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <Form.Text className="text-muted">
                    Don't have an account yet? <span onClick={() => navigate('/signup')}>Click here</span> to create right now!
                </Form.Text>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen