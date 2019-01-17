import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import axios from 'axios';
import { ListView,PullToRefresh } from 'antd-mobile';
import goodsList, {getData} from '../../redux/GoodsList.redux'

let pageNo = 1;
@connect(
  state=>goodsList,
  {getData}
)
class GoodsList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: true,
    };

  this.genData = this.genData.bind(this);
    
  }
  genData(){
    this.props.getData(pageNo);
  }
  //If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    if (nextProps.goodsList.dataSource !== this.props.goodsList.dataSource) {
      this.setState({
        dataBlob:nextProps.goodsList.dataSource,
        refreshing: false,
        isLoading: false,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.goodsList.dataSource),
      });
    }
  }
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
  componentDidMount() {  
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
   this.setState({
     height:hei
   })
    this.genData();    
  }  
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true })
    this.props.getData(1);

  };
  onEndReached = (event) => {
    this.setState({ isLoading: true });
    this.props.getData(pageNo);
  }
  render(){   
    console.log(this.state.dataSource);
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
           <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
            }}
          >{'tian'}</div>        
          v    
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}//渲染的数据源
        renderFooter={() => (<div style={{ padding: 20, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>)}
        renderRow={row}//单条数据
        className="am-list"
        pageSize={15}//每次渲染的条数
        useBodyScroll
        scrollRenderAheadDistance={500}//当一个行接近屏幕范围多少像素之内，就开始渲染这一行
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          damping = {200}
        />}
        scrollRenderAheadDistance={20}//控制在滚动过程中，scroll时间被调用的频率
        onEndReached={this.onEndReached}
        onEndReachedThreshold={15}//调用onEndReached事件临界值
      />   
      
    );
  }
}
export default GoodsList;
