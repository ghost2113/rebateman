import React, { Component } from "react";
import { SearchBar } from 'antd-mobile'
class Home extends Component {
  render() {
    return (
      <div className="home">       
       <SearchBar
          placeholder="Search"
          onFocus={() => this.props.history.push('/search')}
        />
        goodsKind
      </div>
    );
  }
}
export default Home;
