import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";
import { Provider } from "react-redux"
import reducers  from './reducer'
import AuthRoute from './component/AuthRoute/AuthRoute'
import Dashboard from './component/Dashboard/Dashboard'
import Search from './component/Search/Search'
//import './config'
import './App.scss'
import './rem.js'


const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>    
        <AuthRoute></AuthRoute>  
        <Switch>
          <Route path='/search' component={Search}/>          
          <Route  component={Dashboard}/>          
        </Switch>        
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById("root"));