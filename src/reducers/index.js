import {combineReducers} from 'redux';
import Tasks from './renderData';
import isDisplayForm from './isDisplayForm';
// export default (state = {}, action)=>{
// 	return {
// 		Tasks: Tasks(state.Tasks, action)
// 	}
// };

export default combineReducers({
	Tasks,
	isDisplayForm
})