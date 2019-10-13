import {createStore} from 'redux';
import {changeStatus} from './../actions/action';

const initalState = {
	status: true
}
const myReduser = (state = initalState, action)=>{
	switch(action.type){
		case 'CHANGE_STATUS':
			return {
				status: !state.status
			}
			// break;
		default: 
			return state;
	}
}
const store = createStore(myReduser);
console.log(store.getState()); // === reduser() return


store.dispatch(changeStatus({
	type : 'CHANGE_STATUS'
})); // myReduser(state, action) thực hiện hàm này với action

console.log(store.getState()); // === reduser() return