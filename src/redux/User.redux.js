import axios from 'axios'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState={
	msg:'',
	user:'',
	type:''
}
// reducer
export default function user(state=initState, action){
	switch(action.type){
		case AUTH_SUCCESS:
			return {...state, msg:'',...action.payload}
		case LOAD_DATA:
			return {...state, ...action.payload}
		case ERROR_MSG:
			return {...state, isAuth:false, msg:action.msg}
		case LOGOUT:
			return {...initState,redirectTo:'/login'}
		default:
			return state
	}
} 

function authSuccess(obj){
	const {pwd,...data} = obj//隐藏密码
	return {type: AUTH_SUCCESS, payload:data}
}

function errorMsg(msg){
	return { msg, type:ERROR_MSG }
}

export function loadData(userinfo){
	return { type:LOAD_DATA, payload:userinfo}
}
export function logoutSubmit(){
	return { type:LOGOUT }
}
export function updata(data){
	return dispatch=>{
		axios.post('/user/updata',data)
			.then(res=>{
				if (res.status==200&&res.data.code===0) {
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}
export function login({user,pwd}){
	if (!user||!pwd) {
		return errorMsg('用户密码必须输入')
	}
	return dispatch=>{
		axios.post('/user/login',{user,pwd})
			.then(res=>{
				console.log(res);
				if (res.status==200&&res.data.code===0) {
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})		
	}


}

export function register({user,pwd,repeatpwd,type}){
	if (!user||!pwd||!type) {
		return errorMsg('用户名密码必须输入')
	}
	if (pwd!==repeatpwd) {
		return errorMsg('密码和确认密码不同')
	}
	return dispatch=>{
		axios.post('/user/register',{user,pwd,type})
			.then(res=>{
				console.log(res);
				if (res.status==200&&res.data.code===0) {
					dispatch(authSuccess({user,pwd,type}))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})		
	}

}




