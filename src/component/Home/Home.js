import React, { Component } from "react";
import { SearchBar } from 'antd-mobile'
import GoodsTabBar from '../GoodsTabBar/GoodsTabBar'
class Home extends Component {
  render() {
    return (
      <div className="home">       
       <SearchBar
          placeholder="Search"
          onFocus={() => this.props.history.push('/search')}
        />
        <GoodsTabBar></GoodsTabBar>
      </div>
    );
  }
}
export default Home;
