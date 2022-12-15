import React, { useState, useEffect, useReducer, useContext } from 'react';
import AuthContext from '../../context/authContext'
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val, isValid: action.val.includes('@')
    }
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }

}

const passwordReducer = (state, action) => {

  if (action.type === 'USER_INPUT') {
    return {
      value: action.val, isValid: action.val.trim().length > 6
    }
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }

}

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })

  const ctx = useContext(AuthContext)

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log('Checking form validity')
      setFormIsValid(
        passwordState.isValid && emailState.isValid
      );
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [emailState.isValid, passwordState.isValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      val: event.target.value
    })

    // setFormIsValid(
    //   passwordState.isValid && event.target.value.includes('@') && collegeName.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'USER_INPUT',
      val: event.target.value
    })
    // setFormIsValid(
    //     event.target.value.trim().length > 6 && emailState.isValid && collegeName.trim().length > 6
    //   )
  };


  const validateEmailHandler = () => {

    dispatchEmail({
      type: 'INPUT_BLUR'
    })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: 'INPUT_BLUR'
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={emailState.isValid}
          label="E-mail"
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          isValid={passwordState.isValid}
          label="Password"
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        {/* <div
          className={`${classes.control} ${collegeIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={collegeName}
            onChange={collegeNameHandler}
            onBlur={validateCollegeHandler}
          />
        </div> */ }
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
