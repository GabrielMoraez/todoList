import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useNavigate } from "react-router-dom"

import './style.scss'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const RegisterScreen = () => {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [pass, setPass]         = useState('')
  const [passConf, setPassConf] = useState('')
  const navigate                = useNavigate()


  const supabase = createClient('https://feybmhywbhyguwchszdl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleWJtaHl3Ymh5Z3V3Y2hzemRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyMzc2MzgsImV4cCI6MjAwMzgxMzYzOH0.xsOek1h2THKuKAYgIlYYBigiBMUjwl5VCpg-Nd3XPH4')


  const handleRegistration = async () => {
    const { data, error } = await supabase.auth.signUp(
      {
        email: email,
        password: pass,
        options: {
          data: {
            name: name,
          }
        }
      }
    )    
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