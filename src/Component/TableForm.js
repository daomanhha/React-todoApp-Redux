import React,{Component} from 'react';
import TaskElement from './TaskElement';
import { connect } from 'react-redux';

class TableForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterChange: '',
            selectChange: -1 //all: -1, true: 1, false: 0
        }
    }
    async onchangeFilter(e){
        let target = e.target;
        let name = target.name;
        let value = target.value;
        if(name === 'selectChange'){
            value = parseInt(value);
        }
        await this.setState(state=>{
            return {
                [name]: value
            }
        });
        this.props.filterData(this.state);
    }
    render(){
        let {task, changeStatus, deleteData, updateData} = this.props;
        let Elements = task.map((ele,index)=>{
            return (
                <TaskElement 
                            key={`${ele.status} ${ele.id}`} 
                            element={ele} 
                            index={index} 
                            deleteData={deleteData}
                            updateData={updateData}
                />
            );
        });
       return (
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input type="text" 
                               className="form-control"
                               name="filterChange"
                               onChange = {(e)=>this.onchangeFilter(e)} />
                    </td>
                    <td>
                        <select className="form-control" 
                                name="selectChange"
                                onChange = {(e)=>this.onchangeFilter(e)}>
                            <option value="-1">Tất Cả</option>
                            <option value="0">Ẩn</option>
                            <option value="1">Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                   {Elements}
            </tbody>
        </table>
      );
    }
}
const mapStateToProps = (state)=>{
    return {
        task: state.Tasks
    }
}
// function mapStateToProps(state){
//     return {
//         task: state.Tasks
//     }
// }
export default connect(mapStateToProps, null)(TableForm);
