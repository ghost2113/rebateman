import React, { Component } from "react";
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import axios from 'axios';
import GoodsList from '../GoodsList/GoodsList'


class GoodsTabBar extends Component {
  constructor(props){
    super(props)
    this.state={
      tabData:[]
    }
    this.getData = this.getData.bind(this)
    this.changeGoodType = this.changeGoodType.bind(this)
  }
  getData() {
    axios({
      url: 'list/tao/first/category/',
      method: 'get', // 默认是 get9			  
    })
    .then((res)=>{    
      console.log(res)
      const data = res.data.data;
       const data2 = res.data.data.map((item)=>{
         item['title']=item.category
       })
      this.setState({
        tabData:data
      })
    })
    .catch((error)=>{
        console.log(error)
    })
  }
  changeGoodType(tabData,index){
    console.log(tabData)
  }
  componentDidMount(){
    this.getData();
  }
  render(){
    const renderTabBar = (props) =>{
      return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
      </Sticky>);
    }
    const tabData = this.state.tabData;
    return(
      <StickyContainer>
        <Tabs tabs={tabData}
          initalPage={'t2'}
          renderTabBar={renderTabBar}
          tabBarActiveTextColor={"#FB2E3C"}
          tabBarUnderlineStyle={{border:"1px solid #FB2E3C"}}
          useOnPan={false}
          usePaged={true}
          onTabClick={this.changeGoodType}
        >
          {tabData.map((item,index)=>{
            return (
              <GoodsList key={item} ></GoodsList>
            )
              
          })}
          
        </Tabs>
      </StickyContainer>
    )
    
  }
}
export default GoodsTabBar;