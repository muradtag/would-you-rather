import React from "react";
import { connect } from "react-redux";
import { handleAddAnswer } from "../actions/shared";
import { Segment, Form, Divider, Button } from "semantic-ui-react";

class Choices extends React.Component {
	state = {
		value: "",
	};
	handleClick = (e) => {
		this.setState({ value: e.target.id });
	};
	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.value !== "") {
			const { authedUser, question, handleAddAnswer } = this.props;
			handleAddAnswer(authedUser, question.id, this.state.value);
		}
	};
	render() {
		const { question } = this.props;
		return (
			<Segment>
				<Form onSubmit={this.handleSubmit}>
					<Form.Field>
						<Button
							style={{ backgroundColor: "#e6d117", color: "black" }}
							id="optionOne"
							fluid
							content={question.optionOne.text}
							onClick={this.handleClick}
							size="big"
						/>
						<Divider horizontal>OR</Divider>
						<Button
							style={{ backgroundColor: "#e6d117", color: "black" }}
							id="optionTwo"
							fluid
							content={question.optionTwo.text}
							onClick={this.handleClick}
							size="big"
						/>
					</Form.Field>
				</Form>
			</Segment>
		);
	}
}

const mapStateToProps = ({ authedUser }, { question }) => {
	return {
		authedUser,
		question,
	};
};

export default connect(mapStateToProps, { handleAddAnswer })(Choices);
