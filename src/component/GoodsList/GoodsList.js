import React, { Component } from 'react';
import axios from 'axios';
import { ListView } from 'antd-mobile';
class Activity extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      indexPage:0,
      dataBlob:[],
      dataSource,
      isLoading: true,
    };
    this.genData = this.genData.bind(this);
  }
  genData(pIndex = 0) {
    axios({
      url: '/information/list/test',
      method: 'get', // 默认是 get9			  
      baseURL:'https://zhishun888.com/zaotoutiao-api-home-1.0.0',
      params:{
        c: 'fun',
        device: 2,
        userId: Math.floor(Math.random() * ( 1000 + 1)),
        random:Math.random() * ( 1000 + 1),
        page:pIndex
      }
    })
    .then((res)=>{
      const data = [...this.state.dataBlob,...res.data.data];
      this.setState({
        dataBlob:[...this.state.dataBlob,...res.data.data],
        dataSource: this.state.dataSource.cloneWithRows(data),
        hasMore:true,
        isLoading:false
        })
    })
    .catch((error)=>{
        console.log(error)
    })
  }
  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    this.genData();
  }
  onEndReached = (event) => {
    this.setState({ isLoading: true })
    let index = this.state.indexPage
        index++;
    if (this.state.loading&&!this.state.hasMore) {
      return;
    }
    this.genData(index)
    this.setState({
      indexPage:index,
    })
  }
  render() {
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
            }}
          >{rowData.obj.title}</div>        
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : '--Loaded--'}
        </div>)}
        renderRow={row}
        className="am-list"
        pageSize={4}
        useBodyScroll
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}


export default Activity;
