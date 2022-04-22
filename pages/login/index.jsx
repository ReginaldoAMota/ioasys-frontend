import { createRef, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import RootContext from '../../context/rootContext'
import login from '../../services/login'
import styles from './login.module.css'

export default function LoginPage({}) {
  const [loginError, setLoginError] = useState(false)

  const router = useRouter()
  const emailRef = createRef()
  const passwordRef = createRef()

  const context = useContext(RootContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const [data, error] = await login(email, password)

    error && setLoginError(true)
    !error &&
      (context.setState({
        ...context.state,
        isLoggedIn: true,
        token: data.token,
        user: data.data,
      }),
      router.push('/books'))
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <h1>
          <strong className={styles.logo}>ioasys</strong> Books
        </h1>
        <form>
          <div className={styles.formGroup}>
            <div className={styles.formInput}>
              <label htmlFor="email">Email</label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                autoComplete="off"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.formInput}>
              <label htmlFor="password">Password</label>
              <input
                ref={passwordRef}
                id="password"
                type="password"
                autoComplete="off"
              />
            </div>
            <button onClick={handleSubmit}>
              <strong>Entrar</strong>
            </button>
          </div>
          {loginError && (
            <div className={styles.errorContainer}>
              <div className={styles.errorMsg}>
                Email e/ou senhas incorretos.
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
