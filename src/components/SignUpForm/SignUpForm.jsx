import { Component } from 'react'
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
    // Old way of maintaining state: state is always an object with a property for each "piece" of state
    // constructor() {
    //     this.state = {
    //     name: '',
    //     email: '',
    //     password: '',
    //     confirm: '',
    //     error: ''
    //     };
    //     this.handleChange = this.handleChange.bind(this);
    // }
    // handleChange(evt) {  alert(JSON.stringify(this.state))  }

    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
        };

    handleChange = (evt) => {
        // alert(JSON.stringify(this.state))
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        });
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            // We don't want to send the 'error' or 'confirm' property,
            //  so let's make a copy of the state object, then delete them
            const formData = {...this.state};
            delete formData.error;
            delete formData.confirm;
            // The promise returned by the signUp service method 
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const user = await signUp(formData);
            
            this.props.setUser(user);
        } catch {
            // An error occurred
            this.setState({ error: 'Sign Up Failed - Try Again' });

        }
    }

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-1/2">
              <span class="flex items-center mb-6 text-2xl font-semibold dark:text-white">
                  <img class="w-8 h-8 mr-2" src="/TB_Logo.svg" alt="logo" />
                  TradingBlock Challenges    
              </span>
              <div class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-midnight-blue dark:border-midnight-blue">
                  <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                          Sign up for your account
                      </h1>
                      <form class="space-y-4 md:space-y-6" autoComplete="off" onSubmit={this.handleSubmit}>
                          <div>
                              <label for="name" class="block mb-2 text-sm font-medium dark:text-white">Name</label>
                              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="name" class="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Smith" required="" />
                          </div>
                          <div>
                              <label for="email" class="block mb-2 text-sm font-medium dark:text-white">Email</label>
                              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} id="email" class="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                          </div>
                          <div>
                              <label for="password" class="block mb-2 text-sm font-medium dark:text-white">Password</label>
                              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                          </div>
                          <div>
                              <label for="confirm" class="block mb-2 text-sm font-medium dark:text-white">Confirm</label>
                              <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} id="confirm" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                          </div>
                          <button type="submit" disabled={disable} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                          {
                            this.state.error ? 
                            <p className="text-red-500 flex justify-center">&nbsp;{this.state.error}</p>
                            :
                            <></>
                          }
                          <p class="text-sm font-light flex justify-center dark:text-gray-400">
                              Already have an account?&nbsp;<a onClick={() => this.props.setSignUp(false)} class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Login</a>
                          </p>
                      </form>
                  </div>
              </div>
          </div>
        );}
}