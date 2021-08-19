// Login.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Grid, Header, Image, Form } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";

export class Login extends Component {
	state = {
		value: "",
	};
	onChange = (e, { value }) => {
		this.setState({ value });
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const { setAuthedUser } = this.props;
		const authedUser = this.state.value;
		setAuthedUser(authedUser);
	};
	getUsers = () => {
		const { users } = this.props;

		return users.map((user) => ({
			key: user.id,
			text: user.name,
			value: user.id,
			image: { avatar: true, src: user.avatarURL },
		}));
	};

	render() {
		const { value } = this.state;
		return (
			<Grid centered padded>
				<Grid.Column style={{ maxWidth: 650 }}>
					<Segment>
						<Image src="images/logo.png" alt="Logo" size="medium" centered />
						<Header as="h4" block textAlign="center">
							Welcome to the Would You Rather App!
						</Header>
						<Grid padded textAlign="center">
							<Grid.Column>
								<Form onSubmit={this.handleSubmit}>
									<Header as="h2" color="black">
										Sign In
									</Header>
									<Form.Dropdown
										placeholder="Select User"
										selection
										options={this.getUsers()}
										value={value}
										onChange={this.onChange}
									/>
									<Form.Button
										content="Login"
										style={{ backgroundColor: "#e6d117", color: "black" }}
										disabled={value === "" ? true : false}
										fluid
									/>
								</Form>
							</Grid.Column>
						</Grid>
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}

function mapStateToProps({ users }) {
	return {
		users: Object.values(users),
	};
}

export default connect(mapStateToProps, { setAuthedUser })(Login);
