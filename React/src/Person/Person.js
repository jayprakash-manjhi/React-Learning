import React, {useState, useEffect, useRef, useContext} from 'react';
import './Person.css';
import AuthContext from './context/auth-context';
import { withRouter} from 'react-router-dom'; // to get the router related props
//functional component allow to use state using useState() hooks

const Person = (props) =>{
    console.log(props); // logs with roter related props if export used with withRouter, otherwise no router related logs
    const changeAdrsRef = useRef(null);
    const authContext = useContext(AuthContext);
    // Similar to combine both componentDidMount and componentDidUpdate
    // http request can be make here..
    // can use multiple useEffect
    useEffect(()=>{
        console.log('[person.js] useEffect react hook for functional component.');
        const timer = setTimeout(()=>{
            //alert('Hi..useEffect...')
            
        },1000);
        changeAdrsRef.current.click();
        return () =>{
            clearTimeout(timer);
            console.log('[person.js] clean up work in useEffect');
        }
    },[]);
    // ,[] remove if you want to run every time
    // pass [props.name] when you want to run when name change...
    // pass [] to make it run only first time when component render

    useEffect(()=>{
        console.log('[person.js] 2nd useEffect react hook for functional component.');
        return () =>{
            console.log('[person.js] 2nd clean up work in useEffect');
        }
    });

    console.log('[person.js] render child compnent');
    const [genderState, setGendarState ] = useState({
        'gender': 'M'
    })

    const [adrState, setAdrState ] = useState({
        'address': 'Ujjain'
    })

    const setAdrStateHandler = () =>{
            setAdrState({
                'address': 'Mumbai'
            })
    }

   

    return (

            <div className="person">
             <p>App Title: {props.appTitle}</p>
             <p> Reuasalbe functional component, {props.name} {props.children}</p>
             <button type="button" onClick={props.click}>Child can call parent defined function from here </button>
             <p>{genderState.gender}</p>
             <p>{adrState.address}</p>
             <button ref={changeAdrsRef} type="button" onClick={setAdrStateHandler}>Change address</button><br/>
             <p><b>tow way binding ex...</b></p>
             <input type="text" onChange={props.changed} value={props.name}/>

             <button  type="button" onClick={authContext.login} >Make Authenticate using functional conmpoent using useContext()</button>

             <AuthContext.Consumer >
                {context=>
                    context.isAuthenticate ? <p>Authenticate</p> : <p> Not Authenticate</p>
                }
                </AuthContext.Consumer>

                <AuthContext.Consumer>
                {context => <button  type="button" onClick={context.login} >Make Authenticate</button>}
                </AuthContext.Consumer>
            </div>
    );
}
export default Person;
//// to get the router related props
//export default withRouter(Person);

// functional componenet 
//stateless componenet

// const Person = (props) =>{
//     return (
//         <div>
//             <p>This is functional/stateless componenet {props.name}</p>
//         </div>
//     )
// }