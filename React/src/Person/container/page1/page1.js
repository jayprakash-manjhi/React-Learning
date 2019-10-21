import React, { Component } from 'react';
import { Route, Link, Redirect , withRouter} from 'react-router-dom';
import SkillInfo from '../page1/fullSkill';

class PageOne extends Component {
    state = {
        skills: [ {id: 1, name: 'Javascript'},
        {id: 2, name: 'Angular'},
        {id: 3, name: 'React'}]
    }
    componentDidMount() {
        console.log(this.props); // logs with roter related props
    }

    // router navigation using programatically
    routerNavigationHander = (id,e)=>{
        e.preventDefault();
        //this.props.history.push({pathname: '/' + id});
        this.props.history.push('/' + id);

    }

  

    render() {
        console.log(this.props);
        return (
            <div><h3><u>Page name: Skills</u></h3>
                <div className="person">
                    <h2>Skills</h2>
                    <nav className="app-navbar">
                        <ul>
                            {/* Iterate over array */}
                                {this.state.skills.map((skill, index) => {
                                    return(
                                        
                                            <li key={skill.id}>
                                                {/* {---------- Without nested routing, redirect to new page---------------------} */}
                                                {/* <Link to={'/'+ skill.id}>{skill.name}</Link> */}
                                                 {/* {With Nested Routing} */}
                                                <Link to={this.props.match.url+'/'+ skill.id}>{skill.name}</Link>
                                                {/* {Programetically Router Navigation} */}
                                                {/* <a href="#" onClick={this.routerNavigationHander.bind(this, skill.id)} >{skill.name}</a> */}
                                            </li>)
                                        
                                })
                            }
                        </ul>
                    </nav>
                </div>
                {/* {With Nested Routing} */}
                <Route path={this.props.match.url +'/:id'} exact component={SkillInfo} />
                
                </div>

        )
    }
}

export default (PageOne);