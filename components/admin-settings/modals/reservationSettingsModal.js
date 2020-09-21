import React, {Component} from 'react';
import {
  Container,
  Right,
  Content,
  Card,
  Item,
  Icon,
  List,
  ListItem,
  Body,
  CardItem,
  Button,
  Left,
  Switch,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import CustomButton from '../../common/customButtom';
import Config from 'react-native-config';
import Axios from 'axios';
export default class ReservationSettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      is_auto_reservation: false,
      accept_reservation: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      loading: true,
    });
    Axios.get(Config.API_URL + 'funId=59&rest_id=' + Config.rest_id)
      .then((responseJson) => {
        this.setState({
          loading: false,
        });

        if (responseJson.data.list.is_auto_reservation == 0) {
          this.setState({is_auto_reservation: false});
        } else {
          this.setState({is_auto_reservation: true});
        }

        if (responseJson.data.list.accept_reservation == 0) {
          this.setState({accept_reservation: false});
        } else {
          this.setState({accept_reservation: true});
        }
      })
      .catch((error) => this.alert(error));
  }

  reservationSwitch = () => {
    this.setState({
      loading: true,
    });
    let param = 0;
    if (this.state.accept_reservation == false) {
      param = 1;
    } else {
      param = 0;
    }

    Axios.get(
      Config.API_URL +
        'funId=58&rest_id=' +
        Config.rest_id +
        '&accept_reservation=' +
        param,
    )
      .then((responseJson) => {
        this.setState({
          loading: false,
          accept_reservation: !this.state.accept_reservation,
        });
        this.UNSAFE_componentWillMount();
      })
      .catch((error) => this.alert(error));
  };

  autoConfirmationSwitch = () => {
    this.setState({
      loading: true,
    });
    let param = 0;
    if (this.state.is_auto_reservation == false) {
      param = 1;
    } else {
      param = 0;
    }

    Axios.get(
      Config.API_URL +
        'funId=57&rest_id=' +
        Config.rest_id +
        '&is_auto_reservation=' +
        param,
    )
      .then((responseJson) => {
        this.setState({
          loading: false,
          is_auto_reservation: !this.state.is_auto_reservation,
        });
        this.UNSAFE_componentWillMount();
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
                      RESERVATION SETTINGS
                    </Text>
                  </Body>
                </CardItem>
              </Card>

              {this.state.loading && (
                <ActivityIndicator size="large" color="#da092a" />
              )}
              {!this.state.loading && (
                <View>
                  <ListItem>
                    <Left>
                      <Text>Reservation</Text>
                    </Left>

                    <Right>
                      <Switch
                        value={this.state.accept_reservation}
                        onValueChange={this.reservationSwitch}
                      />
                    </Right>
                  </ListItem>

                  <ListItem noBorder>
                    <Left>
                      <Text>Auto Confirm Reservation</Text>
                    </Left>

                    <Right>
                      <Switch
                        value={this.state.is_auto_reservation}
                        onValueChange={this.autoConfirmationSwitch}
                      />
                    </Right>
                  </ListItem>
                </View>
              )}
            </Col>
          </Row>
          <Row>
            <Col style={{marginLeft: 5, marginRight: 5}}>
              <CustomButton
                title="Close"
                onClick={() => this.props.onSubmitModal()}
              />
            </Col>
          </Row>
        </Col>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: '#da092a',
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },

  marginTop: {
    marginTop: 15,
    marginLeft: 7,
    marginRight: 7,
  },
});
