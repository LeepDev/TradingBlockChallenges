import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser, setSignUp }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-1/2">
        <span href="#" class="flex items-center mb-6 text-2xl font-semibold dark:text-white">
            <img class="w-8 h-8 mr-2" src="/TB_Logo.svg" alt="logo" />
            TradingBlock Challenges    
        </span>
        <div class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-midnight-blue dark:border-midnight-blue">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form class="space-y-4 md:space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium dark:text-white">Your email</label>
                        <input value={credentials.email} onChange={handleChange} type="email" name="email" id="email" class="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium dark:text-white">Password</label>
                        <input value={credentials.password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <button type="submit" class="w-full text-white bg-teal hover:bg-teal/70 focus:ring-4 focus:outline-none focus:border-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                    {
                      error ? 
                      <p className="text-red-500 flex justify-center">&nbsp;{error}</p>
                      :
                      <></>
                    }
                    <p class="text-sm font-light flex justify-center dark:text-gray-400">
                        Don’t have an account yet?&nbsp;<a onClick={() => setSignUp(true)} class="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  );
}
