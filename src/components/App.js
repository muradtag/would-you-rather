import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import Nav from "./Nav";
import HomePage from "./HomePage";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import NotFound from "./NotFound";

class App extends React.Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}
	render() {
		const { authedUser } = this.props;
		return (
			<Fragment>
				{authedUser === null ? (
					<Login />
				) : (
					<Fragment>
						<Nav />
						<Switch>
							<Route exact path="/" component={HomePage} />
							<Route path="/questions/:questionId" component={QuestionPage} />
							<Route path="/new" component={NewQuestion} />
							<Route path="/leaderboard" component={Leaderboard} />
							<Route component={NotFound} />
						</Switch>
					</Fragment>
				)}
			</Fragment>
		);
	}
}

const mapStateToProps = ({ authedUser }) => {
	return {
		authedUser,
	};
};

export default connect(mapStateToProps)(App);
