import React from 'react';
import {
  StyleSheet,
  Text,
  AsyncStorage,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Content,
  Card,
  Body,
  ListItem,
  Right,
  Icon,
  Form,
  Item,
  Input,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import CustomButton from '../common/customButtom';
import Login from '../../components/login/login';
import Config from 'react-native-config';
import Axios from 'axios';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pincode: '',
      error: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  logout = () => {
    try {
      AsyncStorage.removeItem('UserDetails');
      this.props.navigation.navigate(Login);
    } catch (error) {}
  };

  onSubmit = () => {
    this.setState({
      loading: true,
    });
    const {pincode} = this.state;

    Axios.get(
      Config.API_URL +
        'funId=89&user_id=' +
        Config.user_id +
        '&pincode=' +
        pincode,
    )
      .then((responseJson) => {
        this.setState({
          loading: false,
        });
        if (responseJson.data.status == 'Failed') {
          //this.props.onSubmitModal();
          this.setState({error: responseJson.data.msg});
        } else {
          Config.pincode = pincode;
          this.props.navigation.navigate('Admin-settings');
        }
      })
      .catch((error) => this.alert(error));
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Card style={styles.card}>
            <ListItem icon noBorder>
              <Body>
                <Text>Admin Settings</Text>
              </Body>
              <Right>
                <Icon name="ios-hammer" type="ionicon" />
              </Right>
            </ListItem>
            <ListItem noBorder>
              <Body>
                <Form>
                  <Item>
                    <TextInput
                      autoFocus={true}
                      value={this.state.pincode}
                      secureTextEntry={true}
                      onChangeText={(pincode) => {
                        this.setState({pincode, error: ''});
                      }}
                      placeholder="Enter Your Pin Here.."
                    />
                  </Item>
                  {this.state.error != '' && (
                    <ListItem noBorder>
                      <Text style={styles.errorText}>{this.state.error}</Text>
                    </ListItem>
                  )}
                </Form>
              </Body>
            </ListItem>
            {this.state.loading && (
              <ActivityIndicator size="large" color="#da092a" />
            )}
            {!this.state.loading && (
              <ListItem noBorder>
                <Body>
                  <Grid>
                    <Col style={styles.btnCol}>
                      <CustomButton
                        title="LOGOUT"
                        onClick={() => this.logout()}
                      />
                    </Col>
                    <Col style={styles.btnCol}>
                      <CustomButton
                        title="SUBMIT"
                        onClick={() =>
                          //  this.props.navigation.navigate('Admin-settings')
                          this.onSubmit()
                        }
                      />
                    </Col>
                  </Grid>
                </Body>
              </ListItem>
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {borderRadius: 10},
  btnCol: {marginLeft: 2, marginRight: 2},
  errorText: {
    color: '#da092a',
  },
});
