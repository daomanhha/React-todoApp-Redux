import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions  from './../actions/action';

class TaskElement extends Component {
     updateData(id){
        this.props.updateData(id);
     }
    render(){
        let {element, index} = this.props;
       return (
            <tr>
                <td>{index+1}</td>
                <td>{element.name}</td>
                <td className="text-center">
                    <span 
                          className="label label-success" 
                          onClick={()=>this.props.onUpdateStatus(element.id)}
                    >
                        {element.status ? 'kích hoạt' : 'ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" 
                            className="btn btn-warning"
                            onClick={()=>this.updateData(element.id)} 
                            >
                        <span className="fa fa-pencil mr-5"
                        ></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" 
                            className="btn btn-danger"
                            onClick={()=>this.props.onDeleteData(element.id)}>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>

      );
    }
}

function mapStateToProps(state){
  return {
    // state: state.Tasks
  }
}
function mapDispathToProps(dispatch, props){
  return {
    onUpdateStatus: (id)=>{
      dispatch(actions.updateStatus(id));
    },
    onDeleteData: (id)=>{
      dispatch(actions.deleteTask(id));
    }
  }

}
export default connect(mapStateToProps, mapDispathToProps)(TaskElement);
