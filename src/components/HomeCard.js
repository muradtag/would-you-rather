import React from "react";
import { connect } from "react-redux";
import { Segment, Header, Grid, Image, Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class HomeCard extends React.Component {
	state = {
		buttonState: false,
	};
	handleClick = () => {
		this.setState({ buttonState: true });
	};
	render() {
		const { question, answered, author } = this.props;

		if (this.state.buttonState === true) {
			return <Redirect push to={`/questions/${question.id}`} />;
		}

		return (
			<Segment.Group>
				<Header as="h4" block attached="top" content={`${author.name} asks:`} />
				<Segment>
					<Grid divided>
						<Grid.Column width={4}>
							<Image src={author.avatarURL} circular />
						</Grid.Column>
						<Grid.Column width={12}>
							<Header as="h4">Would you rather?</Header>
							<h3 style={{ textAlign: "center" }}>
								{question.optionOne.text}
								<br />
								or...
							</h3>
							<Button
								fluid
								style={{ backgroundColor: "#e6d117", color: "black" }}
								content={answered === false ? "Answer Question" : "Results"}
								onClick={this.handleClick}
							/>
						</Grid.Column>
					</Grid>
				</Segment>
			</Segment.Group>
		);
	}
}

function mapStateToProps({ users, questions }, { questionId, answered }) {
	const question = questions[questionId];
	const author = users[question.author];
	return {
		question,
		answered,
		author,
	};
}

export default connect(mapStateToProps)(HomeCard);
