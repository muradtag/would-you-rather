import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Image, Button, Container } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";

class Nav extends React.Component {
	handleLogout = (e) => {
		e.preventDefault();
		this.props.dispatch(setAuthedUser(null));
	};
	render() {
		const { authedUser, users } = this.props;
		return (
			<Container>
				<Menu stackable secondary>
					<Menu.Item>
						<Image src="images/logo.png" alt="Logo" size="tiny" centered />
					</Menu.Item>
					<Menu.Item name="Home" as={NavLink} to="/" exact />
					<Menu.Item name="New Question" as={NavLink} to="/new" />
					<Menu.Item name="Leader Board" as={NavLink} to="/leaderboard" />
					<Menu.Item position="right">
						<span>
							Hello, {users[authedUser].name}
							<Image src={users[authedUser].avatarURL} avatar spaced="left" />
						</span>
						<Button
							content="Logout"
							compact
							icon="log out"
							style={{ marginLeft: "1rem" }}
							onClick={this.handleLogout}
						/>
					</Menu.Item>
				</Menu>
			</Container>
		);
	}
}

const mapStateToProps = ({ users, authedUser }) => {
	return {
		users,
		authedUser,
	};
};

export default connect(mapStateToProps)(Nav);
