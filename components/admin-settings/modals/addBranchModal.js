import React, {Component} from 'react';
import {
  Container,
  Label,
  Content,
  Card,
  Item,
  Icon,
  List,
  ListItem,
  Body,
  CardItem,
  Button,
  Form,
  Input,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import CustomButton from '../../common/customButtom';
import Config from 'react-native-config';
import Axios from 'axios';
export default class AddBranchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      // user_id: Config.rest_id,
      username: '',
      password: '',
    };
  }

  addBranch = () => {
    const {username, password} = this.state;
    if (username != '' && password != '') {
      this.callApi();
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
        'funId=84&parent_restaurant_id=' +
        Config.rest_id +
        '&username=' +
        this.state.username +
        '&password=' +
        this.state.password,
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
        <Col>
          <Row>
            <Col>
              <Card style={styles.headerCard}>
                <CardItem style={styles.headerCard}>
                  <Body>
                    <Text style={{color: 'white', alignSelf: 'center'}}>
                      Add Branch
                    </Text>
                  </Body>
                </CardItem>
              </Card>
              <Form style={styles.form}>
                <Item regular style={styles.item}>
                  <Icon name="mail" />
                  <Input
                    placeholder="Email"
                    onChangeText={(text) => this.setState({username: text})}
                  />
                </Item>
                <Item regular style={styles.item}>
                  <Icon name="lock" />
                  <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                  />
                </Item>
              </Form>
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
                    onClick={() => this.addBranch()}
                  />
                </Col>
              </Row>
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
    // borderTopStartRadius: 10,
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
});
