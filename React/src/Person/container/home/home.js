import React, { Component, Fragment } from 'react';
import Person from '../../../Person/Person';
import Person1 from '../../../Person/Person1';
import AuthContext from '../../../Person/context/auth-context';
import PageOne from '../page1/page1';

class HomePage extends Component{

   // mordern style to decalare state without constructor in new version
  state = {
    name: 'jay',
    age: 30,
    childBlokVisibility: false,
    authenticate: false
  }

  changeNameHandler =(newName) => {
    this.setState( {name:newName});
  }

   //name change handler using tow way binding
  nameChangedHandler =(event)=>{
    this.setState( {name:event.target.value}); 
  }

  toggleChildBlock = () =>{
    let childBlokVisibility = this.state.childBlokVisibility;
    this.setState({
      childBlokVisibility : !childBlokVisibility
    })
  }

  loginHandler =()=>{
    this.setState({'authenticate': true});
  }

  componentDidMount(){
      console.log(this.props);
  }
    
  render(){

         //inline styles
    const btnStyle = {
        backgroundColor: 'gray',
        padding: '8px'
      }
      // elegant way for conditional rendering component, instead of conditional operator in jsx
      let childBlock = null;
      if(this.state.childBlokVisibility){
        childBlock = (
          <div><h2><b>Child Component...</b></h2>
          {/* // ---- lifecycle stage 4: render child component --- */}
          <AuthContext.Provider value={{isAuthenticate: this.state.authenticate, login: this.loginHandler}}>
            {
              <div>
                <Person 
                appTitle={this.props.appTitle}
                name={this.state.name}
                click={ ()=> this.changeNameHandler('manjhi')}
                changed={this.nameChangedHandler}
              >, Sending props using children</Person> 
              <hr/>
              <Person1 
                name={this.state.name} 
                changed={this.nameChangedHandler} />
              </div>
            }
          </AuthContext.Provider>
         
            </div>
        )
      }

        return (
            <Fragment>
            <div><h3><u>Page name: Home</u></h3>
             <button style={btnStyle} type="button" onClick={this.changeNameHandler.bind(this, 'prakash')}>Change Name</button>
           {/* Iqnore this type of click handler calling from arrow function beacause of inefficiant, 
          always try to use with bind as mention in button click */}
          <button style={btnStyle} type="button" onClick={this.toggleChildBlock} >Toggle Child Section</button>
          <hr/>
            </div>
            {childBlock}
            {/* <PageOne /> */}
            </Fragment>)
    }
}

export default HomePage;