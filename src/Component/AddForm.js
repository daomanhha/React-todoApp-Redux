import React,{Component} from 'react';
import {addData, closeForm} from './../actions/action';
import {connect} from 'react-redux';

class AddForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			task: '',
			status: true
		};
	}
	componentDidMount(){
		let {currentEditingTask} = this.props;
		if(currentEditingTask){
			this.setState({
				task: currentEditingTask.name,
				status: currentEditingTask.status
			});
		}
	}
	componentDidUpdate(prevProps, prevState){
		if(prevState === this.state){
			let {currentEditingTask} = this.props;
			if(currentEditingTask){
				this.setState({
					task: currentEditingTask.name,
					status: currentEditingTask.status
				})
				}else{
					this.setState({
						task: '',
						status: true
					})
			}
		}
	}
	onChangeInput(e){
		let target = e.target;
		let name = target.name;
		let value = target.value;
		if(name === 'status'){
			value = value === 'false' ? false : true;
		}
		this.setState(state=>{
			return ({
				[name]: value 
			})
		});
	}

	onSubmit(e){
		let {currentEditingTask , changeData , onSubmitForm} = this.props;
		if(!currentEditingTask){
			e.preventDefault();
			onSubmitForm(this.state);
			this.setState(state=>{
			return{
				task: '',
				status: true
			}
		});
		}else{
			e.preventDefault();
			changeData(currentEditingTask.id, this.state);
		}
	}
	render(){
		let {onCloseForm ,currentEditingTask} = this.props
		return (
			 <div className="panel panel-warning">
                  <div className="panel-heading">
                      <h3 className="panel-title">{currentEditingTask ? 'Sửa Công Việc' : 'Thêm Công Việc'}</h3>
                  </div>
                  <div className="panel-body">
                      <form onSubmit = {(e)=>this.onSubmit(e)}>
                          <div className="form-group">
                              <label>Tên :</label>
                              <input type="text" 
                             		 name="task" 
                             		 className="form-control"
                             		 value={this.state.task}
                             		 onChange={(e)=>this.onChangeInput(e)} />
                          </div>
                          <label>Trạng Thái :</label>
                          <select className="form-control" 
                          		  name="status" 
                          		  required="required"
                          		  value ={this.state.status}
                          		  onChange={(e)=>this.onChangeInput(e)}>
                              <option value={true} >Kích Hoạt</option>
                              <option value={false} >Ẩn</option>
                          </select>
                          <br/>
                          <div className="text-center">
                                <button type="submit" className="btn btn-warning">
                                	{currentEditingTask ? 'Sửa' : 'Thêm'}
                                </button>&nbsp;
                                <button type="button" className="btn btn-danger" onClick={onCloseForm}>Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
              </div>
		);
	}
}
function mapDispatchToProps(dispath, props){
	return {
		onSubmitForm: (task)=>{
			dispath(addData(task));
		},
		onCloseForm: ()=>{
			dispath(closeForm());
		}
	}
}
export default connect(null,mapDispatchToProps)(AddForm);