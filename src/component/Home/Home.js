import React, { Component } from "react";
import { SearchBar } from 'antd-mobile'
import GoodsList from '../GoodsList/GoodsList'
class Home extends Component {
  render() {
    return (
      <div className="home">       
       <SearchBar
          placeholder="Search"
          onFocus={() => this.props.history.push('/search')}
        />
        <GoodsList></GoodsList>
      </div>
    );
  }
}
export default Home;
