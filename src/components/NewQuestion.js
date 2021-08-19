import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Segment, Header, Grid, Form, Divider } from "semantic-ui-react";
import { handleAddQuestion } from "../actions/shared";

class NewQuestion extends React.Component {
	state = {
		optionOne: "",
		optionTwo: "",
		didSubmit: false,
	};

	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { authedUser, handleAddQuestion } = this.props;
		const { optionOne, optionTwo } = this.state;
		handleAddQuestion(optionOne, optionTwo, authedUser);
		this.setState({
			optionOne: "",
			optionTwo: "",
			didSubmit: true,
		});
	};

	render() {
		if (this.state.didSubmit === true) {
			return <Redirect to="/" />;
		}

		return (
			<Grid centered padded>
				<Grid.Column style={{ maxWidth: 650 }}>
					<Segment.Group>
						<Header as="h1" block textAlign="center" attached="top">
							Create New Question
						</Header>
						<Segment>
							<Grid padded>
								<Grid.Column>
									<h4>Complete the question:</h4>
									<h2>Would you rather...</h2>
									<Form onSubmit={this.handleSubmit}>
										<Form.Input
											id="optionOne"
											placeholder="Enter Option One..."
											value={this.state.optionOne}
											onChange={this.handleChange}
										/>
										<Divider horizontal>OR</Divider>
										<Form.Input
											id="optionTwo"
											placeholder="Enter Option Two..."
											value={this.state.optionTwo}
											onChange={this.handleChange}
										/>
										<Form.Button
											fluid
											disabled={
												this.state.optionOne === "" ||
												this.state.optionTwo === ""
											}
											style={{ backgroundColor: "#e6d117", color: "black" }}
										>
											Ask Away!
										</Form.Button>
									</Form>
								</Grid.Column>
							</Grid>
						</Segment>
					</Segment.Group>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = ({ authedUser }) => {
	return {
		authedUser,
	};
};

export default connect(mapStateToProps, { handleAddQuestion })(NewQuestion);
