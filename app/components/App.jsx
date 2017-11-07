import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Menu from './Menu'
import Register from './Register'
import Login from './Login'
import About from './About'
import Contact from './Contact'

class Homepage extends Component {
	render() {
		return (
			<div>
				<Menu />
				<h1>Homepage</h1>
			</div>
		);
	}
}

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/' component={ Homepage } />
					<Route path='/register' component={ Register } />
					<Route path='/login' component={ Login } />
					<Route path="/about" component={ About } />
					<Route path="/contact" component={ Contact } />
				</Switch>
			</div>
		);
	}
}
