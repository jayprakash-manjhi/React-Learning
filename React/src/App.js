import React, { Component, Fragment , Suspense } from 'react';

import './App.css';


import { BrowserRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom';
import HomePage from '../src/Person/container/home/home';
import PageOne from '../src/Person/container/page1/page1';
//import PageTwo from '../src/Person/container/page2/page2';

//Lazy loading
const AsyncPageTwo = React.lazy(()=> import('../src/Person/container/page2/page2'))


class App extends Component {
  
  // ---- lifecycle stage 1 ---
  constructor(props){
    super(props);
    console.log('[app.js] constructor');
    this.state = {
      
    }
    // this.state = {
    //   name: 'jay',
    //   age: 30,
    //   childBlokVisibility: false,
    //   skills:['html','css','javascript']
    // }  
  }

  // ---- lifecycle stage 2 ---
  static getDerivedStateFromProps(props , state){
    // not often for use, update state based on the props
    // not suitable for http request
    console.log('[app.js] getDerivedStateFromProps', props);
    return state;
  }

  // ---- lifecycle stage 5 ---
  componentDidMount(){
    console.log('[app.js] compoenentDidMount');
    //get page related inital data using http request
  }

  componentDidUpdate(prevProps){
    console.log('[app.js] componentDidUpdate');
    //typical usage, don't forget ot compare props
  }
  
  //render() will not be invoked if shouldComponentUpdate() returns false.
  //     This will be a safer alternative to the previous lifecycle method componentWillReceiveProps().
  
  shouldComponentUpdate(nextProps, nextState){
    console.log('[app.js] shouldComponentUpdate');
    return true; /// false for restrict update in child component.
  }

   // ---- lifecycle stage 5 ---
  // componentWillMount(){
  //   console.log('[app.js] compoenentWillMount');
  // }


 

  // ---- lifecycle stage 3---
  render() {
    console.log('[app.js] render');

    return (
      <Fragment>
        <BrowserRouter>
        <header className="App-header">
          
          <h1 className="App-title">Welcome to {this.props.appTitle}</h1>

          <nav className="app-navbar">
            <ul>
              {/* NavLink autometically added active class to active route */}
              <li><NavLink to="/" exact>Home</NavLink></li>
              <li><NavLink to={{ pathname: '/skills'}}>Skills</NavLink></li>
              <li><NavLink to={{ pathname: '/authPage'}}>Authenticated Page</NavLink></li>
            </ul>
          </nav>  
        </header>
        
        {/* Router tage without props */}
        {/* <Route path="/" exact component={HomePage} /> */} 
        {/* Router tage with props */}
          <Switch>
            {/* {---------- Without nested routing, and redirect to new page (required exact)---------------------} */}
            {/* <Route path="/" exact  
              component={() => <HomePage appTitle={this.props.appTitle}/>}  /> */}

            
            <Route path="/skills"  component={PageOne} />

            
            {/* <Route path="/pagetwo"  component={PageTwo} /> */}
            {/* <PrivateRoute path='/authPage' component={PageTwo} /> */}
             
            {/* {Lazy loading of skikk component using Suspense in react 16.6}
                And Private authenticated page */}  
            <Route path='/authPage' render={()=> 
              <Suspense fallback={<div>Loading...</div>}> 
                <PrivateRoute path='/authPage' component={AsyncPageTwo} /> 
              </Suspense>} />

            {/* {---------- Without nested routing, and redirect to new page---------------------} */}
            {/* <Route path="/:id" exact component={SkillInfo} /> */}

            {/* {-------------------------------} */}
            {/* {When nested routing, remove exact}  */}
            <Route path="/home"  
              component={() => <HomePage appTitle={this.props.appTitle}/>}  />
              {/* <Route render = {()=> <h1>Not Found...</h1>} /> {not found page} */}
              <Redirect from="/" to="/home" />
          </Switch>
       </BrowserRouter> 
       
       
       
    </Fragment>
      
    );
  }
}


const myAuth = {
  isAuthenticate: true
}

function PrivateRoute ({component: Component, ...rest}) {
  let isAuthenticate = myAuth.isAuthenticate;
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticate
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

export default App;
