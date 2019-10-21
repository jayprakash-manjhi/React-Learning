import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AuthContext from './context/auth-context';
import './Person.css';
class Person1 extends Component{

    //If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps
    //componentWillReceiveProps is depricated, it is removed from new versson
    // componentWillReceiveProps(props){
    //     console.log('[Person1.js] componentWillReceiveProps', props);
    // }

    // it is also removed....
    // componentWillUpdate(){

    // }

    // ---- lifecycle update stage 1 ---
    // static getDerivedStateFromProps(props, state){
    //     console.log('[Person1.js] getDerivedStateFromProps');
    //     return state;
    // }

    // ---- lifecycle update stage 2 ---
    shouldComponentUpdate(nextProps, nextState){
        console.log('[Person1.js] shouldComponentUpdate');
        if(nextProps.name !== this.props.name){
            return true;
        }
        return false;
        //This lifecycle can be handy sometimes when you don’t want React to render your state or prop changes
    }

    // ---- lifecycle update stage 3 ---
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[Person1.js] getSnapshotBeforeUpdate');
        return {'message': 'snapshot'}
    }

    // ---- lifecycle update stage 5 ---
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('[Person1.js] componentDidUpdate');
        console.log('Snpashot value', snapshot);
    }

    // when compnent unmount from dom/ destroyed
    componentWillUnmount(){
        console.log('[Person1.js] componentWillUnmount');
    }

    constructor(props){
        super(props);
        this.inputElementRef = React.createRef(); // Second way(Newer) to create ref
    }

    static contextType = AuthContext;

    componentDidMount(){
        console.log(this.props) // logs without roter related props
        //this.inputElement.focus(); // First way(Older) to create ref
        this.inputElementRef.current.focus(); // Second way(Newer) to create ref
        console.log(this.context.isAuthenticate); // Second way to use context using contextType(Better and suggesed)

    }

    // ---- lifecycle update stage 4 ---
    render(){
        console.log('[Person1.js] rendering...')
        
        return(
            <div  className="person">
                {/* first way to get context */}
                <AuthContext.Consumer >
                {context=>
                    context.isAuthenticate ? <p>Authenticate</p> : <p> Not Authenticate</p>
                }
                </AuthContext.Consumer>

                
                {/* Second way to get context (Better and suggesed) */}
                {this.context.isAuthenticate ? <p>Authenticate</p> : <p>Not Authenticate</p>}
                
                <h1>Inside Person1 </h1>
                {console.log('[Person1.js] child component rendering...')}
                <input type="text" 
                //ref = {(inputElem)=>{this.inputElement = inputElem}} // First way(Older- Functional way approach) to create ref, 
                ref = {this.inputElementRef} // Second way(Newer) to create ref
                onChange={this.props.changed} value={this.props.name}/>
                <AuthContext.Consumer>
                    {context => <button  type="button" onClick={context.login} >Make Authenticate</button>}
                 </AuthContext.Consumer>
            </div>
           
        
    )}
}

// propTypes to validate datatype of props
// external library need to be install: npm i --save prop-types
Person1.propTypes = {
    changed: PropTypes.func,
    name: PropTypes.string
}

export default Person1;