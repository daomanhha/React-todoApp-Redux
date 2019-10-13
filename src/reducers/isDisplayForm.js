import * as types from './../constants/index';

const initialState = false //đóng form
export default (state = initialState, action)=>{
	switch(action.type){
		case types.openForm:
			return true;
		case types.closeForm:
			return false;
		default:
			return state;
	}
}