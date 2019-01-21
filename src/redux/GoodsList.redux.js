const GOODS_TYPE = 'GOODS_TYPE';
const initState={
	goodsType:'推荐'
}

// reducer
export default function goodsType(state=initState, action){
	switch(action.type){
		case GOODS_TYPE:
			return {...state,action.goodsType};
		default:
			return state
	}
} 
function loadData(data,pageNo){
	return {type: LOAD_DATA, payload:data, pageNo:pageNo}
}
export function getData(goodsType,keyword){
	let api = "professional/product/list" ;
	let keyword = "";
	switch(goodsType){
		case "推荐":
			dispatch();
	}
}