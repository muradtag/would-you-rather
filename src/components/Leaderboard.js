import React from "react";
import { connect } from "react-redux";
import {
	Grid,
	Label,
	Segment,
	Image,
	Header,
	Divider,
} from "semantic-ui-react";

class Leaderboard extends React.Component {
	render() {
		const { arrangedUsersId, users } = this.props;
		const trophyColor = ["yellow", "grey", "orange"];
		return (
			<Grid centered padded>
				<Grid.Column style={{ maxWidth: 650 }}>
					{arrangedUsersId.map((id, idx) => (
						<Segment key={id}>
							<Label corner="left" icon="trophy" color={trophyColor[idx]} />
							<Grid divided padded>
								<Grid.Column verticalAlign="middle" width={5}>
									<Image circular src={users[id].avatarURL} />
								</Grid.Column>
								<Grid.Column verticalAlign="middle" width={8}>
									<Header as="h2" content={users[id].name} />
									<Grid>
										<Grid.Column width={12}>Answered questions</Grid.Column>
										<Grid.Column width={4}>
											{Object.keys(users[id].answers).length}
										</Grid.Column>
									</Grid>
									<Divider />
									<Grid>
										<Grid.Column width={12}>Created questions</Grid.Column>
										<Grid.Column width={4}>
											{users[id].questions.length}
										</Grid.Column>
									</Grid>
								</Grid.Column>
								<Grid.Column verticalAlign="middle" width={3}>
									<Header as="h1" textAlign="center" content="Score" />
									<Header as="h1" textAlign="center">
										{Object.keys(users[id].answers).length +
											users[id].questions.length}
									</Header>
								</Grid.Column>
							</Grid>
						</Segment>
					))}
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = ({ users }) => {
	const arrangedUsersId = Object.keys(users).sort((a, b) => {
		const UserA =
			Object.keys(users[a].answers).length + users[a].questions.length;
		const UserB =
			Object.keys(users[b].answers).length + users[b].questions.length;
		return UserB - UserA;
	});
	return {
		arrangedUsersId,
		users,
	};
};

export default connect(mapStateToProps)(Leaderboard);
