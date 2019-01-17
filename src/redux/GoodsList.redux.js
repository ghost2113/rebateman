import axios from 'axios'

const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'
const initState={
	dataSource:[],
	pageNo:0
}

// reducer
export default function goodsList(state=initState, action){
	switch(action.type){
		// case LOAD_DATA:
		// 	let goodsType = Object.keys(state).indexOf(action.goodsType)>-1		
		// 	let data = goodsType?
		// 						{...state,[action.goodsType]:[...state[action.goodsType],...action.payload]}
		// 				  	:{...state,[action.goodsType]:[...action.payload]}
		// 	return data;
		case LOAD_DATA:
			return {...state,dataSource:[...state.dataSource,...action.payload],pageNo:action.pageNo};
		case ERROR_MSG:
			return {...state, msg:action.msg};
		default:
			return state
	}
} 
function loadData(data,pageNo){
	return {type: LOAD_DATA, payload:data, pageNo:pageNo}
}
function errorMsg(msg){
	return { msg, type:ERROR_MSG }
}
export function getData(pageNo=1){
	return dispatch=>{
		axios({
			url:'professional/product/list',
			params:{
				userId: 1265,
				pageSize:15,
				pageNo: pageNo,
				random: Math.random()
			},
			baseURL:'https://zhishun520.com/toutiaotv-api-home-1.0.0/'
		}).then(res=>{
				if (res.status==200) {
					dispatch(loadData(res.data.data,pageNo))
				}
		}).catch(res=>{
					console.log(res)
		})
	}
}