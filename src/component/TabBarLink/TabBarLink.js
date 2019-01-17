import React, { Component } from "react";
import {connect} from 'react-redux'
import { TabBar } from "antd-mobile"
import {withRouter} from 'react-router-dom'
@withRouter
class TabBarLink extends Component{
  render(){
    const navList = this.props.data
    const {pathname} = this.props.location
    return(
      <div> 
        <TabBar
        unselectedTintColor="#999999"
        tintColor="#EC3937"
        barTintColor="white"
      >
      {navList.map(v=>(    
          <TabBar.Item	
            title={`${v.text}`}
            key={`${v.text}`}
            icon={{uri:require(`../navimg/${v.icon}.png`)}}
            selectedIcon={{uri:require(`../navimg/${v.icon}-active.png`)}}
            selected={pathname==v.path}
            onPress={()=>{
							this.props.history.push(v.path)
						}}
          >
          </TabBar.Item>
        ))}        
        </TabBar>
      </div>      
    )
  }
}

export default TabBarLink;