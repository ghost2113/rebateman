const GOODS_TYPE = 'GOODS_TYPE';
const initState={
	type:"",
	api:"",
	keyword:"",
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
function goodstype(api,keyword,goodstype){
	return {type: GOODS_TYPE, api:api,keyword:keyword goodstype:goodstype}
}
export function getTabData(keyword="",goodstype=""){
	let apiArr = ["professional/product/list","professional/product/list"] ;
	let keyword = ""; 
	let api = keyword=""?apiArr[0]:apiArr[1];
	dispatch(goodstype(api,keyword,goodstype))