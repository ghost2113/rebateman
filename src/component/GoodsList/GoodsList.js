import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ListView, PullToRefresh } from "antd-mobile";
import DefaultImg from "../../img/default.png";
const NUM_ROWS = 20;
let pageIndex = 1;
class GoodsList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      dataBlob: [],
      dataSource,
      hasMore: true,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: true
    };
    this.getData = this.getData.bind(this);
  }
  getData() {
    axios({
      url: "professional/product/list",
      method: "get", // 默认是 get9
      baseURL: "https://zhishun520.com/toutiaotv-api-home-1.0.0/",
      params: {
        userId: 1265,
        pageSize: 15,
        random: Math.random(),
        pageNo: pageIndex
      }
    })
      .then(res => {
        console.log(res);
        const LENGTH_DATA = res.data.data.length;
        if (LENGTH_DATA > 0) {
          let data = [...this.state.dataBlob, ...res.data.data];
          pageIndex++;
          this.setState({
            dataBlob: [...this.state.dataBlob, ...res.data.data],
            dataSource: this.state.dataSource.cloneWithRows(data),
            hasMore: true,
            isLoading: false,
            indexPage: pageIndex
          });
        } else {
          this.setState({
            hasMore: false,
            isLoading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({
      isLoading: true,
      height: hei
    });
    this.getData();
  }
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }
  onEndReached = event => {
    this.setState({ isLoading: true });

    if (this.state.loading && !this.state.hasMore) {
      return;
    }
    this.getData(pageIndex);
  };
  onRefresh = () => {
    this.setState({
      refreshing: true,
      isLoading: true
    });
    axios({
      url: "professional/product/list",
      method: "get", // 默认是 get9
      baseURL: "https://zhishun520.com/toutiaotv-api-home-1.0.0/",
      params: {
        userId: 1265,
        pageSize: 15,
        random: Math.random(),
        pageNo: 1
      }
    })
      .then(res => {
        const data = [...res.data.data];
        this.setState({
          dataBlob: [...res.data.data],
          dataSource: this.state.dataSource.cloneWithRows(data),
          isLoading: false,
          refreshing: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const row = (rowData, sectionID, rowID) => {
      return (
        <dl className="goods-item" key={rowID}>
          <dt>
            <img
              src={`${rowData.itemPicUrl}_600x600q90.jpg`}
              alt="图片加载失败"
            />
          </dt>
          <dd>
            <div
              className="title"
            >
              {rowData.name}
            </div>
            <div className="dd2">
								<div className="coupon">${rowData.coupon}元券</div>
								<div className="rebate"></div>
						</div>
            <div className="dd3">
								<div className="dd3-wrap">
									<div className="price">￥{(rowData.itemPrice-rowData.coupon).toFixed(2)}元</div>
									<div className="itemPrice">￥{rowData.itemPrice}</div>
								</div>
								<div>
									<div className="sales">已售{(rowData.sales)}</div>
								</div>								
							</div>
          </dd>
        </dl>
      );
    };
    return (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: "center" }}>
            {this.state.isLoading ? "Loading..." : "--Loaded--"}
          </div>
        )}
        refreshing={this.state.refreshing} //是否显示更新状态
        renderRow={row}
        classNameName="am-list goods-container"
        pageSize={4}
        useBodyScroll={true}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        pullToRefresh={
          <PullToRefresh
            indicator={{ deactivate: "下拉可以刷新" }}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          >
            ))}
          </PullToRefresh>
        }
        onEndReachedThreshold={10}
      />
    );
  }
}

export default GoodsList;
