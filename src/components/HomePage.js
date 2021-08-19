import React from "react";
import { connect } from "react-redux";
import { Label, Menu, Tab, Icon, Grid, Header } from "semantic-ui-react";
import HomeCard from "./HomeCard";

class HomePage extends React.Component {
	renderPanes() {
		const { unansweredQuestions, answeredQuestions } = this.props;
		return [
			{
				menuItem: (
					<Menu.Item key="unanswered">
						<Icon name="question" />
						Unanswered Questions<Label>{unansweredQuestions.length}</Label>
					</Menu.Item>
				),
				render: () => (
					<Tab.Pane as="div">
						{unansweredQuestions.map((question) => (
							<HomeCard
								key={question.id}
								questionId={question.id}
								answered={false}
							/>
						))}
						{unansweredQuestions.length === 0 && (
							<Header as="h5" block textAlign="center">
								No More Questions
								<br />
								<br />
								Ask Away!
							</Header>
						)}
					</Tab.Pane>
				),
			},
			{
				menuItem: (
					<Menu.Item key="answered">
						<Icon name="check" />
						Answered Questions<Label>{answeredQuestions.length}</Label>
					</Menu.Item>
				),
				render: () => (
					<Tab.Pane as="div">
						{answeredQuestions.map((question) => (
							<HomeCard
								key={question.id}
								questionId={question.id}
								answered={true}
							/>
						))}
					</Tab.Pane>
				),
			},
		];
	}
	render() {
		return (
			<Grid centered padded>
				<Grid.Column style={{ maxWidth: 650 }}>
					<Tab
						menu={{ secondary: true, pointing: true }}
						defaultActiveIndex={0}
						panes={this.renderPanes()}
					/>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = ({ authedUser, users, questions }) => {
	const answeredQuestions = Object.values(questions)
		.filter((question) =>
			Object.keys(users[authedUser].answers).includes(question.id)
		)
		.sort((a, b) => b.timestamp - a.timestamp);
	const unansweredQuestions = Object.values(questions)
		.filter(
			(question) =>
				!Object.keys(users[authedUser].answers).includes(question.id)
		)
		.sort((a, b) => b.timestamp - a.timestamp);
	return {
		answeredQuestions,
		unansweredQuestions,
	};
};

export default connect(mapStateToProps)(HomePage);
