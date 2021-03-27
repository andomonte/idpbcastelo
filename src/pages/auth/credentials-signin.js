import { csrfToken } from 'next-auth/client'

export default function SignIn({ csrfToken }) {
  return (
    <form method='get' action='/api/auth/callback/credentials'>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
      <label>
        Username
        <input name='username' type='text'/>
      </label>
      <label>
        Password
        <input name='password' type='text'/>
      </label>
      <button type='submit'>Sign in</button>
    </form>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context)
  }
}