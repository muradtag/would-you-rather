import React, { Component, Fragment } from "react";
import { Header, Image, Grid } from "semantic-ui-react";
import { connect } from "react-redux";

class NotFound extends Component {
	render() {
		return (
			<Grid centered padded>
				<Grid.Column style={{ maxWidth: 650 }}>
					<Fragment>
						<Image size="medium" centered src="images/notFound.png" />
						<Header textAlign="center" as="h2">
							Page Not Found
						</Header>
						<Header textAlign="center" as="h4">
							Please try another page from the Navigation Bar
						</Header>
					</Fragment>
				</Grid.Column>
			</Grid>
		);
	}
}

export default connect()(NotFound);
