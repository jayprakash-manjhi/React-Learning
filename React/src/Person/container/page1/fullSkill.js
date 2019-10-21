import React , {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';

class SkillInfo extends Component{
    state = {
        1: 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles. !!!',
        2: 'Angular is a platform for building mobile and desktop web applications. Join the community of millions of developers who build compelling user interfaces. !!!',
        3: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right. !!!',
        currentData: null,
        currentId: null
    }
    componentDidMount(){
        console.log('[fullSkill.js] componentDidMount');
        console.log(this.props)
        this.loadData();
    }

    componentDidUpdate(){
        console.log('[fullSkill.js] componentDidUpdate');
        console.log(this.props)
        this.loadData();
    }

    loadData(){
        if(this.state.currentId != this.props.match.params.id){
            this.setState({
                'currentData': this.state[this.props.match.params.id],
                'currentId':this.props.match.params.id
            })
        }
    }
    
    render(){  
        console.log('[fullSkill.js] render');
        console.log(this.props);
        return (
            <div className="person">
                {/* <NavLink to={{ pathname: '/pageone'}}>Back to Skills</NavLink> */}
                <Link to={'/skills'}>Back to Skills</Link>
                <p>{this.state.currentData} </p>   
            </div>
        )
    }
}

export default SkillInfo;