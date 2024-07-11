import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '../auth-context'
import { useSnackbar } from '../snackbar-context'
import useFirebase from '@/hooks/useFirebase'
import {
  schemaLoginForm,
  schemaRegisterForm,
  schemaForgetPasswordForm,
} from './schema-auth-forms'

const LoginContext = createContext()

export function LoginContextProvider({ children }) {
  // context
  const { auth, login, googleLogin, register, forgotPassword } = useAuth()
  const { openSnackbar } = useSnackbar()
  const { getOAuth } = useFirebase()

  // Login
  const [loginModalState, setLoginModalState] = useState(false)
  const [loginData, setLoginData] = useState({ account: '', password: '' })
  const [loginErrors, setLoginErrors] = useState({
    account: '',
    password: '',
    result: '',
  })
  const handleLoginChange = (e) => {
    const { name, value } = e.target
    const newLoginData = { ...loginData, [name]: value }
    setLoginData(newLoginData)
  }
  const loginSubmit = async (e) => {
    e.preventDefault()

    // 資料驗證

    const LoginValidationResult = schemaLoginForm.safeParse(loginData)
    const newLoginErrors = { account: '', password: '', result: '' }

    if (!LoginValidationResult.success) {
      if (LoginValidationResult.error?.issues?.length) {
        for (let issue of LoginValidationResult.error.issues) {
          newLoginErrors[issue.path[0]] = issue.message
        }
        setLoginErrors(newLoginErrors)
      }
      return // 表單資料沒有驗證通過就直接返回
    }

    // 驗證完成，送出登入
    const result = await login(loginData.account, loginData.password)
    if (result.success) {
      // 如果登入成功
      setLoginModalState(false)
      setLoginData({ account: '', password: '' })
      setLoginErrors({ account: '', password: '', result: '' })
      openSnackbar('登入成功！', 'success')
    } else {
      // 如果登入失敗
      console.error(result.error)
      setLoginErrors({ account: '', password: '', result: '帳號或密碼錯誤' })
    }
  }

  // Register
  const [registerState, setRegisterState] = useState(false) // open close
  const [registerData, setRegisterData] = useState({
    account: '',
    password: '',
    reenter_password: '',
    name: '',
  })
  const [registerErrors, setRegisterErrors] = useState({
    account: '',
    password: '',
    reenter_password: '',
    name: '',
    result: '',
  })
  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    const newRegisterData = { ...registerData, [name]: value }
    setRegisterData(newRegisterData)
  }
  const registerSubmit = async (e) => {
    e.preventDefault()

    // 資料驗證
    const RegisterValidationResult = schemaRegisterForm.safeParse(registerData)
    const newRegisterErrors = {
      account: '',
      password: '',
      reenter_password: '',
      name: '',
      result: '',
    }

    if (!RegisterValidationResult.success) {
      if (RegisterValidationResult.error?.issues?.length) {
        for (let issue of RegisterValidationResult.error.issues) {
          newRegisterErrors[issue.path[0]] = issue.message
        }
        setRegisterErrors(newRegisterErrors)
      }
      return // 表單資料沒有驗證通過就直接返回
    }

    // 包裝
    const newRegisterData = { ...registerData, nick_name: registerData.name }

    const result = await register(
      newRegisterData.account,
      newRegisterData.password,
      newRegisterData.name,
      newRegisterData.nick_name
    )

    if (result.success) {
      // 如果註冊成功
      openSnackbar('註冊成功！返回登入', 'success')
      loginFormSwitch('Login')
    } else {
      // 如果註冊失敗
      setRegisterErrors({ result: 'Email已被註冊，請試試其他Email' })
    }
  }

  // ForgotPassword
  const [otpData, setOtpData] = useState('')
  const [forgotPasswordState, setForgotPasswordState] = useState(false) // open close
  const [forgotPasswordData, setForgotPasswordData] = useState({
    account: '',
  })
  const [forgotForgotPasswordErrors, setForgotPasswordErrors] = useState({
    account: '',
    result: '',
  })
  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target
    const newPasswordData = { ...forgotPasswordState, [name]: value }
    setForgotPasswordData(newPasswordData)
  }
  const forgotPasswordSubmit = async (e) => {
    e.preventDefault()
    // 資料驗證
    const fpValidationResult =
      schemaForgetPasswordForm.safeParse(forgotPasswordData)
    const newForgotPasswordErrors = {
      account: '',
      result: '',
    }

    if (!fpValidationResult.success) {
      if (fpValidationResult.error?.issues?.length) {
        for (let issue of fpValidationResult.error.issues) {
          newForgotPasswordErrors[issue.path[0]] = issue.message
        }

        setForgotPasswordErrors(newForgotPasswordErrors)
      }

      return // 表單資料沒有驗證通過就直接返回
    }

    // 驗證成功，包裝送後端 OTP

    let result = await forgotPassword(forgotPasswordData.account)
    if (result.success) {
      // 如果發送成功
      setForgotPasswordData({ account: '' })
      setForgotPasswordErrors({ account: '', result: '' })
      openSnackbar('發送成功', 'success')
    } else {
      // 如果發送失敗
      console.error(result.error)
      openSnackbar(result.error, 'error')
    }
  }

  // FormSwitch
  const loginFormSwitch = (formName) => {
    setLoginData({ account: '', password: '' })
    setRegisterData({
      account: '',
      password: '',
      reenter_password: '',
      name: '',
    })
    setForgotPasswordData({ account: '' })
    setLoginErrors({
      account: '',
      password: '',
      result: '',
    })
    setRegisterErrors({
      account: '',
      password: '',
      reenter_password: '',
      name: '',
      result: '',
    })
    setForgotPasswordErrors({
      account: '',
      result: '',
    })

    if (formName === 'Login') {
      setLoginModalState(true)
      setRegisterState(false)
      setForgotPasswordState(false)
    } else if (formName === 'Register') {
      setLoginModalState(false)
      setRegisterState(true)
      setForgotPasswordState(false)
    } else if (formName === 'ForgotPassword') {
      setLoginModalState(false)
      setRegisterState(false)
      setForgotPasswordState(true)
    } else {
      setLoginModalState(false)
      setRegisterState(false)
      setForgotPasswordState(false)
    }
  }

  const callbackGoogleLogin = async (providerData) => {
    // 如果已經登入中，不需要再作登入動作
    if (auth.id !== 0) return
    // 向伺服器進行登入動作
    const result = await googleLogin(providerData)
    if (result.success) {
      // 如果登入成功
      loginFormSwitch()
      // openSnackbar('登入成功！', 'success')
    } else {
      // 如果登入失敗
      console.error(result.error)
      openSnackbar('登入失敗，請洽管理員！', 'error')
    }
  }

  useEffect(() => {
    loginFormSwitch()
    getOAuth(callbackGoogleLogin)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LoginContext.Provider
      value={{
        loginModalState,
        loginData,
        loginErrors,
        handleLoginChange,
        loginSubmit,
        registerState,
        registerData,
        registerErrors,
        handleRegisterChange,
        registerSubmit,
        forgotPasswordState,
        forgotPasswordData,
        forgotForgotPasswordErrors,
        handleForgotPasswordChange,
        forgotPasswordSubmit,
        otpData,
        setOtpData,
        loginFormSwitch,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}
export const useLoginModal = () => useContext(LoginContext)
export default LoginContext