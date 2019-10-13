import React,{Component} from 'react';
import './App.css';
import AddForm from './Component/AddForm';
import Control from './Component/Control';
import TableForm from './Component/TableForm';
import {connect} from 'react-redux';
import * as actions from './actions/action';
let randomstring = require('randomstring');

class App extends Component {
  constructor(props){
    super(props);
    this.deleteData = this.deleteData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.changeData = this.changeData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      currentEditingTask: null,
      keyFilter: {
        filterChange: '',
        selectChange: -1
      },
      keySearch: {
        search: ''
      }
    }
  }
  // componentDidMount(){
  //   // let task = [
  //   // {
  //   //   id: randomstring.generate(7),
  //   //   name: 'Học ReactJs',
  //   //   status : true
  //   // }
  //   // ]
  //   // localStorage.setItem('task',JSON.stringify(task));
  //   let tasks = JSON.parse(localStorage.getItem('task'));
  //   this.setState(state=>{
  //     return {
  //       tasks: tasks
  //     }
  //   });
  // }

  // onOpenForm(){
  //   this.setState(state=>{
  //     return {
  //       isDislayForm: true,
  //       currentEditingTask: null
  //     }
  //   });
  // }
  // onCloseForm(){
  //   this.setState(state=>{
  //     return {
  //       isDislayForm: false
  //     }
  //   });
  // }
  // onSubmitForm(data){
  //   if(data.task){
  //     let {tasks} = this.state;
  //   let task = {
  //      id: randomstring.generate(7),
  //      name: data.task,
  //      status : data.status
  //    }
  //   tasks.push(task);
  //   localStorage.setItem('task',JSON.stringify(tasks));
  //   let taskData = JSON.parse(localStorage.getItem('task'));
  //   this.setState(state=>{
  //     return {
  //       tasks: taskData
  //     }
  //   });
  //   }
  //   return;
  // }
  // changeStatus(id){
  //   let {tasks} = this.state;
  //   //find index and change the status
  //   tasks.forEach((task,index)=>{
  //     if(task.id === id){
  //       task['status'] = !task['status'];
  //     }
  //   });
  //   //setstate
  //   this.setState({
  //     tasks: tasks
  //   });
  //   //update to localStrorage
  //   localStorage.setItem('task',JSON.stringify(tasks));
  // }
  deleteData(id){
   if(window.confirm('bạn có muốn xóa')){
     let {tasks} = this.state;
    //delete the task 
    let afterDeleteTasks = tasks.filter(task=>{
      return task.id !== id;
    });
    //setstate
    this.setState({
      tasks: afterDeleteTasks
    });
    //update to localStrorage
    localStorage.setItem('task',JSON.stringify(afterDeleteTasks));
   }
  }
  updateData(id){
    let {tasks} = this.state;
    //find the id
    let indexOfTheCurrentEditingTask;
    tasks.forEach((ele,index)=>{
      if(ele.id === id){
        indexOfTheCurrentEditingTask = index;
      }
    });
    this.setState({
      isDislayForm : true,
      currentEditingTask: tasks[indexOfTheCurrentEditingTask]
    });
  }
  changeData(id, data){
    console.log(id);
    let {tasks} = this.state;
    //change the data
    tasks.forEach((ele, index)=>{
      if(ele.id === id){
        //change the data where match id
         tasks[index]['id'] = id;
         tasks[index]['name'] = data.task;
         tasks[index]['status'] = data.status;
      }
    });
    //update to localstorage;
    localStorage.setItem('task',JSON.stringify(tasks));
    let taskData = JSON.parse(localStorage.getItem('task'));
    console.log(taskData);
    this.setState(state=>{
      return {
        tasks: taskData
      }
    });
  }
  filterData(data){
    this.setState({
      keyFilter: data
    });
  }
  onSearch(data){
    this.setState({
      keySearch: data
    })
  }
  render(){
      let {  currentEditingTask, keyFilter, keySearch} = this.state;
      // if(keyFilter.filterChange){
      //   tasks = tasks.filter((task)=>{
      //     return task.name.toLowerCase().indexOf(keyFilter.filterChange.toLowerCase()) !== -1;
      //   })
      // }
      // if(keyFilter.selectChange !== -1){
      //   tasks = tasks.filter((task)=>{
      //     return task.status === (keyFilter.selectChange === 1 ? true : false);
      //   })
      // }
      // if(keySearch.search){
      //   tasks = tasks.filter((task)=>{
      //     return task.name.toLowerCase().indexOf(keySearch.search.toLowerCase()) !== -1;
      //   });
      // }
      return (
      <div className="App">
          <div className="container">
              <div className="text-center">
                  <h1>Quản Lý Công Việc</h1>
                  <hr/>
              </div>
              <div className="row">
                  <div className={this.props.isDislayForm 
                      ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' 
                      : 'col-xs-0 col-sm-0 col-md-0 col-lg-0'
                    }>
                      {this.props.isDislayForm &&
                        <AddForm 
                                 />} 
                    {/*conditional rendering*/}
                  </div>
                    <div className={this.props.isDislayForm 
                      ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' 
                      : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
                    }>
                        <button type="button" 
                                className="btn btn-primary" 
                                onClick = {()=>this.props.onOpenForm()}
                        >
                            <span className="fa fa-plus mr-5"></span>
                            Thêm Công Việc
                        </button>
                        <div className="row mt-15">
                            <Control onSearch={this.onSearch} />
                        </div>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <TableForm 
                                         deleteData= {this.deleteData}
                                         updateData = {this.updateData}
                                         filterData= {this.filterData}/>
                            </div>
                        </div>
                    </div>
                </div>
          </div>  
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    isDislayForm: state.isDisplayForm
  }
}
function mapDispatchToProps(dispatch, props){
  return {
    onCloseForm: ()=>{
      dispatch(actions.closeForm());
    },
    onOpenForm: ()=>{
      dispatch(actions.openForm());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
