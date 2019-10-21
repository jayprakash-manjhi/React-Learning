import React, { Component} from 'react';

// class PageTwo extends Component{
//     render(){
//         return (
//             <div><h1>Page 2 routing...</h1></div>
//             )
//     }
// }

const PageTwo = (props) =>{
    console.log(this.props); // logs without roter related props
    return (
        
        <div><h3><u>Page name: Authenticated Page</u></h3></div>
        
    )
}

export default PageTwo;