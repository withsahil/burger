import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './User'
import { handleFetchUsers, handleAddUser, handleDeleteUser, handleUpdateUser } from './redux/actions/user.actions';

class App extends Component {
  state = {
    name: '',
    job: ''
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(handleFetchUsers());
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onAddUser = () => {
    const { name, job } = this.state;

    this.props.dispatch(handleAddUser({ name, job }));

    this.setState({ name: '', job: '' });
  }

  onUpdateUserHandler = () => {
    const { name, id } = this.state;
    const [first_name = '', last_name = ''] = name.split(' ')
    
    this.props.dispatch(handleUpdateUser(first_name, last_name, id));

    setTimeout(()=>{
      this.setState({
        first_name,
        last_name,
        name:`${first_name} ${last_name}`
      })
    },1500)
    

    this.setState({ name: '', job: '' })
  }

  onUpdateUser = (first_name, last_name, id) => {
    this.setState({
      name: `${first_name} ${last_name}`,
      id
    })
  }

  onDeleteUser = (id) => {
    this.props.dispatch(handleDeleteUser(id));
  }

  render() {
    const { users } = this.props;
    const { name, job, id } = this.state;


    return (
      <div>
        <div>
          <input type="text" name="name" placeholder="name" value={name} onChange={this.handleChange} />
          <input type="text" name="job" placeholder="job" value={job} onChange={this.handleChange} />
          <button onClick={this.onAddUser}>Add User</button>
          <button onClick={() => this.onUpdateUserHandler(name, id) } onChange={this.handleChange}>Update User</button>
        </div>
        {users.map(user => (
          <User
            {...user}
            key={user.id}
            onUpdateUser={this.onUpdateUser}
            onDeleteUser={this.onDeleteUser} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps)(App);
