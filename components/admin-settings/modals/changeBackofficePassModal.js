import React, {Component} from 'react';
import {Card, Item, Icon, Body, CardItem, Form, Input} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {
  Alert,
  StyleSheet,
  Text,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import CustomButton from '../../common/customButtom';
import Config from 'react-native-config';
import Axios from 'axios';

export default class ChangeBackofficePassModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: Config.owner_email,
      previouspassword: '',
      newpassword: '',
      confirmPassword: '',
    };
  }

  changeBackOfficePassword = () => {
    const {previouspassword, newpassword, confirmPassword, email} = this.state;
    if (newpassword != '' && previouspassword != '' && confirmPassword != '') {
      if (newpassword !== confirmPassword) {
        this.alert(
          'Failed',
          "New Password doesn't match with confirm password!!!",
        );
      } else {
        if (newpassword.length < 6 || newpassword.length > 16) {
          this.alert('Failed', 'Password must be 6 to 16 characters !!!');
        } else {
          this.callApi();
        }
      }
    } else {
      this.alert('Failed', 'Please fill up all the fields!!!');
    }
  };

  alert = (title, message) => {
    Alert.alert(title, message, [{text: 'OK'}], {
      cancelable: false,
    });
  };

  callApi = () => {
    this.setState({loading: true});

    Axios.get(
      Config.API_URL +
        'funId=10&email=' +
        this.state.email +
        '&previouspassword=' +
        this.state.previouspassword +
        '&newpassword=' +
        this.state.newpassword,
    )
      .then((responseJson) => {
        this.setState({
          loading: false,
        });
        this.alert(responseJson.data.status, responseJson.data.msg);
        if (responseJson.data.status != 'Failed') {
          this.props.onSubmitModal();
        }
      })
      .catch((error) => this.alert(error));
  };

  render() {
    return (
      <Grid>
        <Col style={styles.modalColHeight}>
          <Row>
            <Col>
              <Card style={styles.headerCard}>
                <CardItem style={styles.headerCard}>
                  <Body>
                    <Text style={{color: 'white', alignSelf: 'center'}}>
                      CHANGE PASSWORD
                    </Text>
                  </Body>
                </CardItem>
              </Card>
              <Form style={styles.form}>
                <Item regular style={styles.item}>
                  <Icon name="lock" />
                  <Input
                    onChangeText={(text) =>
                      this.setState({previouspassword: text})
                    }
                    placeholder="Previous Password"
                  />
                </Item>
                <Item regular style={styles.item}>
                  <Icon name="lock" />
                  <Input
                    // value={this.state.newpassword}
                    onChangeText={(text) => this.setState({newpassword: text})}
                    placeholder="New Password"
                  />
                </Item>
                <Item regular style={styles.item}>
                  <Icon name="lock" />
                  <Input
                    onChangeText={(text) =>
                      this.setState({confirmPassword: text})
                    }
                    placeholder="Confirm Password"
                  />
                </Item>
              </Form>

              {this.state.loading && (
                <ActivityIndicator size="large" color="#da092a" />
              )}

              {!this.state.loading && (
                <Row>
                  <Col style={styles.buttonColumn}>
                    <CustomButton
                      title="Cancel"
                      onClick={() => this.props.onSubmitModal()}
                    />
                  </Col>
                  <Col style={styles.buttonColumn}>
                    <CustomButton
                      title="Confirm"
                      onClick={() => this.changeBackOfficePassword()}
                    />
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Col>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 1,
    margin: 7,
  },
  headerCard: {
    // borderRadius: 10,
    backgroundColor: '#da092a',
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  item: {
    borderRadius: 10,
    marginTop: 5,
  },
  marginTop: {
    marginTop: 15,
  },
  buttonColumn: {
    marginLeft: 7,
    marginRight: 7,
  },
  loader: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
