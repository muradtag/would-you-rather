import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import QuestionChoices from "./QuestionChoices";
import QuestionResult from "./QuestionResult";
import { Segment, Header, Grid, Image, Button } from "semantic-ui-react";

class QuestionPage extends React.Component {
	state = {
		backClick: false,
	};
	handleClick = () => {
		this.setState((prevState) => ({
			backClick: !prevState.backClick,
		}));
	};
	render() {
		const { question, author, answered } = this.props;

		if (this.state.backClick === true) {
			return <Redirect push exact to="/" />;
		}

		return (
			<Grid centered padded>
				<Grid.Column style={{ maxWidth: 650 }}>
					<Segment>
						<Grid divided padded>
							<Grid.Row>
								<Grid.Column width={4}>
									<Image src={author.avatarURL} circular />
								</Grid.Column>
								<Grid.Column width={12} verticalAlign="middle">
									<Header as="h1" content={`${author.name} asks:`} />
									<Header floated="left" as="h2">
										Would you rather...
									</Header>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={16}>
									{answered ? (
										<QuestionResult question={question} />
									) : (
										<QuestionChoices question={question} />
									)}
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Segment>
					<Button
						size="medium"
						color="black"
						floated="right"
						onClick={this.handleClick}
					>
						Back
					</Button>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = ({ users, questions, authedUser }, { match }) => {
	const question = questions[match.params.questionId];
	const author = users[question.author];
	const answered = Object.keys(users[authedUser].answers).includes(question.id);

	return {
		question,
		author,
		answered,
	};
};

export default connect(mapStateToProps)(QuestionPage);
