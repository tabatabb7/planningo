import React from "react";
import { connect } from "react-redux";
// import { updateSingleTask } from "../../store/singletask";
import CreateTaskModal from './CreateTaskModal'
import TaskModal from './TaskModal'
import "./Tasks.css";
import {
  fetchTasksThunk,
  removeTaskThunk,
} from "../../store/tasks";

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      selected: "",
      show: false,
      showTask: false,
    };
    this.showModal = this.showModal.bind(this);
  }
  componentDidMount() {
    this.props.fetchTasks();
  }


  async handleDelete(id) {
    try {
      await this.props.deleteTask(id);
      this.props.fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  showModal(e) {
    this.setState({ show:!this.state.show });
  }

  showTaskModal(e) {
    this.setState({ showTask:!this.state.showTask });
  }

  render() {
    let { tasks } = this.props.tasks

    return (
      <div className="task-wrapper">
        <div id="task-box">My Tasks
        <button  onClick={e => {this.showModal(e)}} className="add-task-button"> Add task </button>
        <CreateTaskModal onClose={e => this.showModal(e)} show={this.state.show}/>
        {tasks && tasks.length ?
        tasks.map((task) => (
          <p key={task.id} className="singletask" >
            <a onClick={e => this.showTaskModal(e)}>{task.name}</a>
            <TaskModal onClose={e => this.showTaskModal(e)} showTask={this.state.showTask}/>
            <button
              onClick={() => this.handleDelete(task.id)}
              className="deleteTask"
            >
              X
            </button>
          </p>
        )) : "You have no tasks"}
        </div>
          </div>
    );
  }
}

const mapState = (state) => ({
  tasks: state.tasks,
  userId: state.user.id,
});

const mapDispatch = (dispatch) => ({
  fetchTasks: () => dispatch(fetchTasksThunk()),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  // updateTask: (task) => dispatch(updateSingleTask(task))
});


export default connect(mapState, mapDispatch)(TaskList);
