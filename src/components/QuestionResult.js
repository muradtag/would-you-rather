import React from "react";
import { connect } from "react-redux";
import { Segment, Progress, Label } from "semantic-ui-react";

class Result extends React.Component {
	render() {
		const { optionOneVotes, optionTwoVotes, userVote, question } = this.props;
		const totalVotes = optionOneVotes + optionTwoVotes;
		return (
			<Segment>
				<Segment>
					{userVote === "optionOne" && <YourVote />}
					<p>{question.optionOne.text}</p>
					<Progress
						color={
							optionOneVotes > optionTwoVotes
								? "green"
								: optionOneVotes === optionTwoVotes
								? "yellow"
								: "grey"
						}
						value={optionOneVotes}
						total={totalVotes}
						progress="percent"
						precision={0}
					>
						{optionOneVotes} out of {totalVotes} votes.
					</Progress>
				</Segment>
				<Segment>
					{userVote === "optionTwo" && <YourVote />}
					<p>{question.optionTwo.text}</p>
					<Progress
						color={
							optionTwoVotes > optionOneVotes
								? "green"
								: optionOneVotes === optionTwoVotes
								? "yellow"
								: "grey"
						}
						value={optionTwoVotes}
						total={totalVotes}
						progress="percent"
						precision={0}
					>
						{optionTwoVotes} out of {totalVotes} votes.
					</Progress>
				</Segment>
			</Segment>
		);
	}
}

const YourVote = () => {
	return (
		<Label floating style={{ backgroundColor: "#e6d117", color: "black" }}>
			Your Vote
		</Label>
	);
};

const mapStateToProps = ({ users, authedUser }, { question }) => {
	const optionOneVotes = question.optionOne.votes.length;
	const optionTwoVotes = question.optionTwo.votes.length;
	const userVote = users[authedUser].answers[question.id];

	return {
		question,
		optionTwoVotes,
		optionOneVotes,
		userVote,
	};
};

export default connect(mapStateToProps)(Result);
