import * as React from "react";
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
} from 'semantic-ui-react'
import { Link } from "react-router-dom";

interface Props {

}

const Layout: React.FC<Props> =
    ( { children } ) => {

        return (
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item as='a' header>
                            <Image size='mini' src='/logo192.png' style={{ marginRight: '1.5em' }} />
                            Project Name
                        </Menu.Item>
                        <Menu.Item as='a'><Link to='/'>Home</Link></Menu.Item>

                        <Dropdown item simple text='  Test demos  '>
                            <Dropdown.Menu>
                                <Dropdown.Item><Link to='/passwordDemo'>Password Hook</Link></Dropdown.Item>
                                <Dropdown.Item><Link to='/duckTester'>Duck tester</Link></Dropdown.Item>
                                <Dropdown.Item><Link to='/'>Home</Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                </Menu>

                <Container style={{ marginTop: '7em', minHeight:'800px' }}>
                    {children}
                </Container>

                <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
                    <Container textAlign='center'>
                        <Grid divided inverted stackable>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Group 1' />
                                <List link inverted>
                                    <List.Item as='a'>Link One</List.Item>
                                    <List.Item as='a'>Link Two</List.Item>
                                    <List.Item as='a'>Link Three</List.Item>
                                    <List.Item as='a'>Link Four</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Group 2' />
                                <List link inverted>
                                    <List.Item as='a'>Link One</List.Item>
                                    <List.Item as='a'>Link Two</List.Item>
                                    <List.Item as='a'>Link Three</List.Item>
                                    <List.Item as='a'>Link Four</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Group 3' />
                                <List link inverted>
                                    <List.Item as='a'>Link One</List.Item>
                                    <List.Item as='a'>Link Two</List.Item>
                                    <List.Item as='a'>Link Three</List.Item>
                                    <List.Item as='a'>Link Four</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header inverted as='h4' content='Footer Header' />
                                <p>
                                    Extra space for a call to action inside the footer that could help re-engage users.
            </p>
                            </Grid.Column>
                        </Grid>

                        <Divider inverted section />
                        <Image centered size='mini' src='/logo192.png' />
                        <List horizontal inverted divided link size='small'>
                            <List.Item as='a' href='#'>
                                Site Map
          </List.Item>
                            <List.Item as='a' href='#'>
                                Contact Us
          </List.Item>
                            <List.Item as='a' href='#'>
                                Terms and Conditions
          </List.Item>
                            <List.Item as='a' href='#'>
                                Privacy Policy
          </List.Item>
                        </List>
                    </Container>
                </Segment>
            </div>
        )
    }

export { Layout };