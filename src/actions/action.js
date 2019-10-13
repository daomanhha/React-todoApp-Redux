import * as types from './../constants/index';
export function renderData(param){
	return param;
}
export function addData(task){
	return {
		type: types.AddData,
		task
	}
}
export function closeForm(){
	return {
		type: types.closeForm
	}
}
export function openForm(){
	return {
		type: types.openForm
	}
}
export function updateStatus(id){
	return {
		type: types.updateStatusTask,
		id
	}
}
export function deleteTask(id){
	return {
		type: types.deleteTask,
		id
	}
}