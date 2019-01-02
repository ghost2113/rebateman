import { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '../../redux/User.redux'

@connect(
  state=>state.user,
  {loadData}
)
@withRouter
class AuthRoute extends Component {
  componentDidMount() {
    this.props.history.push('/home')
    // const publicList = ['/login','register']
    // const pathName = this.props.location.pathname
    // if(publicList.indexOf(pathName)>-1){
    //   return null
    // }
		// // 获取用户信息
		// axios.get('/user/info').
		// 	then(res=>{
    //     console.log("用户信息",res)
    //     if (res.status==200) {
		// 			if (res.data.code==0) {
		// 				// 有登录信息de
    //         this.props.loadData(res.data.data)                        
    //         // 用户的type 身份是boss还是牛人
    //         // 用户是否完善信息（选择头像 个人简介）
		// 			}else{
		// 				this.props.history.push('/login')
		// 			}
		// 		}
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })
	}
  render() {
    return (
      null
    )
  }
}

export default AuthRoute;