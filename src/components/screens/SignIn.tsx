import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '~/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { validateFields } from '../../utils/util';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = useAuth();

    const validate = validateFields(email, password);

    if (validate.error) {
      setErrorMsg(validate.msg as string);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user) {
            navigate('/');
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorMsg(error.code);
        });
    }
  };
  return (
    <div className='max-w-[500px] mx-auto'>
      <h1 className='text-2xl text-bold text-center text-slate-100 mb-5'>
        Sign In
      </h1>
      <div className='text-white text-center mb-6'>
        <Link to='/signup'>Need an account?</Link>
      </div>
      {errorMsg && <p className='error-msg text-red-500 mb-4'>{errorMsg}</p>}
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input
          type='email'
          className='mb-4 p-2 rounded'
          data-test='email'
          value={email}
          placeholder='Email Address'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          className='mb-4 p-2 rounded'
          data-test='password'
          value={password}
          placeholder='Password'
          autoComplete='on'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit' className='btn btn-primary normal-case'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignIn;
