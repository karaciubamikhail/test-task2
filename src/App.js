import React, { Component } from 'react'
import uuid from 'uuid'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import Login  from './components/Login'

class App extends Component {
	constructor(props) {
		super(props)
		this.state={
			items: [],
			itemsToShow: "all",
			id: uuid(),
			item: '',
			editItem: false,
		}
		this.data = [
			{
				login:'admin',
				password:'admin'
			}
		]
	}
	loginHandle = event =>{
		event.preventDefault();
		const {target} = event;
		let formData = new FormData(target.parentElement);
		let login = formData.get('login');
		let password = formData.get('password');
		if(login === this.data[0].login && password === this.data[0].password){
			localStorage.setItem('user',login);
			window.location.assign('http://localhost:3000/');
		}else{
			return(
				<p>Неверный логин или пароль</p>
			)
		}
	}
	handleChange = event => {
		this.setState({
			item: event.target.value
		})
	}

	handleSubmit = event => {
		event.preventDefault()
		
		const newItem = {
			id: this.state.id,
			title: this.state.item,
			completed: false
		}
		
		const updatedItems = [...this.state.items, newItem]

		if (this.state.item.length > 0) {
			this.setState({
				items: updatedItems,
				id: uuid(),
				item: '',
				editItem: false
			})
		}
	}

	updateTodosToShow = string => {
		this.setState({
			itemsToShow: string
		});
	};

	handleDoneTask = (id, completed) => {
		const filteredItems = this.state.items.map(item => {
			item.id === id && (item.completed = !item.completed)
			return item
		})

		this.setState({
			items: filteredItems,
		})
	}

	handleDelete = id => {
		const filteredItems = this.state.items.filter(item => item.id !== id)

		this.setState({
			items: filteredItems
		})
	}

	handleEdit = id => {
		const filteredItems = this.state.items.filter(item => item.id !== id)

		const selectedItem = this.state.items.find(item => item.id === id)

		this.setState({
			items: filteredItems,
			id: id,
			item: selectedItem.title,
			editItem: true
		})
	}

	handleDeleteDoneTasks = () => {
		const filteredItems = this.state.items.filter(item => item.completed === false)

		this.setState({
			items: filteredItems
		})
	}

	clearList = () => {
		this.setState({
			items: []
		})
	}

	render() {
		let items = []

		if (this.state.itemsToShow === "all") {
			items = this.state.items;
		} else if (this.state.itemsToShow === "todo") {
			items = this.state.items.filter(item => !item.completed);
		} else if (this.state.itemsToShow === "done") {
			items = this.state.items.filter(item => item.completed);			
		}
		if(localStorage.length === 1){
			return (
				<div className="container">
					<div className="row">
						<div className="col-10 col-md-8 mx-auto mt-4">
							<h3 className="text-capitalize text-center">TodoInput</h3>
							<TodoInput
								item={this.state.item}
								handleChange={this.handleChange}
								handleSubmit={this.handleSubmit}
							/>
							<TodoList
								items={items}
								filterDoneTasks={this.filterDoneTasks}
								clearList={this.clearList}
								handleDelete={this.handleDelete}
								handleEdit={this.handleEdit}
								handleDoneTask={this.handleDoneTask}
								handleDeleteDoneTasks={this.handleDeleteDoneTasks}
								updateTodosToShow={this.updateTodosToShow}
							/>
						</div>
					</div>
				</div>
			);
		}
		return(
		<div className="container">
			<h3 className="text-capitalize text-center">Todo login</h3>
			<Login 
				loginHandle = {this.loginHandle}
			/>
		</div>
		);
	}
}

export default App;
