import * as types from './../constants/index';
let randomstring = require('randomstring');

const initialState = JSON.parse(localStorage.getItem('task'));

export default (state = initialState , action )=>{
	switch(action.type){
		case types.TakeData:
			return state;
		case types.AddData:
			let newTask = {
				id: randomstring.generate(7),
				name: action.task.task,
				status: action.task.status
			}
			let newState = [...state];
			newState.push(newTask);
			localStorage.setItem('task',JSON.stringify(newState));
			return newState;
		case types.updateStatusTask:
			let newUpdateStatusState = [...state];
			newUpdateStatusState.forEach((ele,index)=>{
				if(ele.id === action.id){
					newUpdateStatusState[index].status = !newUpdateStatusState[index].status;
					// const cloneTask = {...newUpdateStatusState[index]};
					// cloneTask.status = !cloneTask.status 
					// newUpdateStatusState[index] = cloneTask;
					//Gán địa chỉ
				}
			})
			localStorage.setItem('task',JSON.stringify(newUpdateStatusState));
			return newUpdateStatusState;
		case types.deleteTask:
			let newStateAfterDelete = [...state]; 
			if(window.confirm('bạn có muốn xóa không')){
				newStateAfterDelete = newStateAfterDelete.filter((ele)=>{
					return ele.id !== action.id;
				});
				localStorage.setItem('task',JSON.stringify(newStateAfterDelete));
				return newStateAfterDelete;
			}
			else return newStateAfterDelete;

		default:
		 	return state;
	}
}

