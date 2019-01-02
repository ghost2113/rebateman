import React, { Component } from "react";
import {Switch,Route} from "react-router-dom";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import TabBarLink from "../TabBarLink/TabBarLink"
import Home from '../Home/Home'
function Vip(){
  return (
    <div>Vip</div>
  )
}
function User(){
  return (
    <div>User</div>
  )
}
class Dashboard extends Component {
  render() {
    const Navlist = [
      {
        path: "/home",
        text: "首页",
        icon: "home",
        component: Home,
        default:true
      },
      {
        path: "/vip",
        text: "vip",
        icon: "vip",
        component: Vip,
      },
      {
        path: "/user",
        text: "个人中心",
        icon: "user",
        component: User,
      }
    ];
    return (
      <div className="dashboard">       
        <div style={{paddingBottom:88}}>
						<Switch>
							{Navlist.map(v=>(
                  <Route key={v.path} path={v.path} component={v.component}></Route>					
							))}
						</Switch>
				</div>
        <TabBarLink className="am-tab-bar" data={Navlist}></TabBarLink>
      </div>
    );
  }
}
export default Dashboard;
