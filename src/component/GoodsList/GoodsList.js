import React, { Component } from 'react';
import ReactDOM from "react-dom"
import axios from 'axios';
import { ListView,PullToRefresh } from 'antd-mobile';

const NUM_ROWS = 20;
let pageIndex = 1;
class GoodsList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataBlob:[],
      dataSource,
      hasMore:true,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: true
    };
    this.getData = this.getData.bind(this);
  }
  getData() {
    axios({
      url: 'professional/product/list',
      method: 'get', // 默认是 get9			  
      baseURL:'https://zhishun520.com/toutiaotv-api-home-1.0.0/',
      params:{
        userId:1265,
        pageSize:15,
        random:Math.random(),
        pageNo:pageIndex
      }
    })
    .then((res)=>{
      console.log(res)
      const LENGTH_DATA = res.data.data.length;
      if(LENGTH_DATA>0){
        let data = [...this.state.dataBlob,...res.data.data];
        pageIndex++;
        this.setState({
          dataBlob:[...this.state.dataBlob,...res.data.data],
          dataSource: this.state.dataSource.cloneWithRows(data),
          hasMore:true,
          isLoading:false,
          indexPage:pageIndex
        })
      }else{
        this.setState({
          hasMore:false,
          isLoading:false
        })
      }
      
    })
    .catch((error)=>{
        console.log(error)
    })
  }
  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({
      isLoading: true,
      height:hei
    });
    this.getData();
  }
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
  onEndReached = (event) => {
    this.setState({ isLoading: true })

    if (this.state.loading&&!this.state.hasMore) {
      return;
    };
    this.getData(pageIndex);
  }
  onRefresh = () => {
    this.setState({ 
      refreshing: true, 
      isLoading: true,      
    });
    axios({
      url: 'professional/product/list',
      method: 'get', // 默认是 get9			  
      baseURL:'https://zhishun520.com/toutiaotv-api-home-1.0.0/',
      params:{
        userId:1265,
        pageSize:15,
        random:Math.random(),
        pageNo:1
      }
    })
    .then((res)=>{
      const data = [...res.data.data];
      this.setState({
        dataBlob:[...res.data.data],
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoading:false,
        refreshing:false,
        })
    })
    .catch((error)=>{
        console.log(error)
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
          >{'tian'}</div>        
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
        refreshing={this.state.refreshing}//是否显示更新状态
        renderRow={row}
        className="am-list goods-container"
        pageSize={4}
        useBodyScroll={true}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        pullToRefresh={
          <PullToRefresh 
            indicator={{ deactivate: '下拉可以刷新' }}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}>
        ))}
           
          </PullToRefresh>}
        onEndReachedThreshold={10}
      />
    );
  }
}


export default GoodsList;
