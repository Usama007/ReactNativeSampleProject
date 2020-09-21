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
import {TextInput} from 'react-native-gesture-handler';

export default class ChangeDevicePinModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user_id: Config.user_id,
      old_pincode: '',
      new_pincode: '',
      confirmPincode: '',
    };
  }

  changeDevicePincode = () => {
    const {old_pincode, new_pincode, confirmPincode, user_id} = this.state;
    if (new_pincode != '' && old_pincode != '' && confirmPincode != '') {
      if (new_pincode !== confirmPincode) {
        this.alert(
          'Failed',
          "New pincode doesn't match with confirm pincode!!!",
        );
      } else {
        if (new_pincode.length != 4) {
          this.alert('Failed', 'Pincode must be 4 digits!!!');
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
        'funId=88&user_id=' +
        this.state.user_id +
        '&old_pincode=' +
        this.state.old_pincode +
        '&new_pincode=' +
        this.state.new_pincode,
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
                      CHANGE PINCODE
                    </Text>
                  </Body>
                </CardItem>
              </Card>
              <Form style={styles.form}>
                <Item regular style={styles.item}>
                  <Icon name="lock" />
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={(text) => this.setState({old_pincode: text})}
                    placeholder="Previous Pincode"
                  />
                </Item>
                <Item regular style={styles.item}>
                  <Icon name="lock" />
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={(text) => this.setState({new_pincode: text})}
                    placeholder="New Pincode"
                  />
                </Item>
                <Item regular style={styles.item}>
                  <Icon name="lock" />
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      this.setState({confirmPincode: text})
                    }
                    placeholder="Confirm Pincode"
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
                      onClick={() => this.changeDevicePincode()}
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
