import React from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/all';


class App extends React.Component {

	constructor(props) {
		super(props);
		this.input = React.createRef();
		this.state = {
			newWho    : "",
			newWat    : "",
			characters: []

		}
	}

	/*save new who*/
	handleWho = event => {
		this.setState({
			newWho: event.target.value
		});
	};
	/*save new wat*/
	handleWat = event => {
		this.setState({
			newWat: event.target.value
		});
	};
	/*update qty*/
	handleCool = person => event => {
		//console.log(event, person);
		const cool = +event.target.value;
		this.setState(state => {
			return {
				characters: state.characters.map(item => item === person ? {...person, cool} : item)
			}
		})
	};
	/*remove person*/
	removePerson = person => {
		this.setState(state => {
			return {
				characters: state.characters.filter(item => item !== person)
			}
		})

	};

	/*add new person*/
	handleSubmit = event => {
		//event.preventDefault();
		//console.log(this.state.person);
		if (event.key === "Enter" && this.state.newWho && this.state.newWat) {
			this.setState(state => {
				const newPerson = {
					id  : Math.max(...this.state.characters.map(p => p.id)) + 1,
					who : this.state.newWho,
					wat : this.state.newWat,
					cool: 0
				};
				return {
					characters: [...state.characters, newPerson]
				}
			});
			this.resetForm();
		}

	};

	/*load my people*/
	componentDidMount = () => {
		fetch('https://api.myjson.com/bins/zg7ze')
			.then(resulte => resulte.json())

			.then(json => this.setState({characters: json}))
	};

	/*listOfPeople component*/
	listOfPeople = () => {
		return (this.state.characters.map(person =>
				(<li key={person.id} className="person">
					<a className="ctrl" onClick={() => this.removePerson(person)}><AiOutlineDelete/></a>

					<article className={person.qty < 10 ? 'faded' : person.qty > 50 ? 'gold' : ''}>
						{person.who}
						<span>{person.wat}</span>
					</article>

					<input type="number" className="ctrl" value={person.cool} onChange={this.handleCool(person)}/>
				</li>))
		)


	};
	/*reset form*/
	resetForm = () => {
		this.setState({
			newWho: '',
			newWat: ''
		});
		this.input.current.focus();
	};

	/*template*/
	render() {

		return (
			<div className="container">
				<ul>{this.listOfPeople()}</ul>
				<form className="add-new" onKeyPress={this.handleSubmit}>
					<input autoFocus type="text"
					       ref={this.input}
					       value={this.state.newWho}
					       onChange={this.handleWho}
					/>
					<input type="text"
					       value={this.state.newWat}
					       onChange={this.handleWat}
					/>
				</form>
				<p className="preview">{this.state.newWho}</p>
				<p className="preview">{this.state.newWat}</p>
			</div>
		);
	}
}

export default App;

