import React, { Component } from "react";
import { SearchBar } from 'antd-mobile'
class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '美食',
    }
  }

  onChange= (value) => {
    this.setState({ value });
    console.log(this.state.value)
  };
  clear = () => {
    this.setState({ value: '' });
  };
  handleClick = () => {
    this.manualFocusInst.focus();
  }
  render() {
    return (
      <div className="home">       
        <SearchBar
          value={this.state.value}
          placeholder="Search"
          onSubmit={value => console.log(value, 'onSubmit')}
          onClear={value => console.log(value, 'onClear')}
          onFocus={() => console.log('onFocus')}
          onBlur={() => console.log('onBlur')}
          onCancel={() => console.log('onCancel')}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
export default Search;
