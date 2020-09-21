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
  Input,
  Footer,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {
  Alert,
  Modal,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';
import CustomButton from '../common/customButtom';
import {color} from 'react-native-reanimated';
import {Text} from 'react-native-elements';
import Axios from 'axios';
import Config from 'react-native-config';

export default class ReservationDetail extends Component {
  customerName = '';
  address = '';
  mobileNo = '';
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      customerName: '',
      address: '',
      postcode: '',
      mobileNo: '',
    };
  }
  componentDidMount() {
    this.setState({loading: true});
    Axios.get(Config.API_URL + 'funId=26&reservation_id=187806')
      //   .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson.data,
        });
        let data = this.state;
        // console.warn(this.state.customerName);
      })
      .catch((error) => console.log(error));
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <Container style={styles.container}>
        <Content>
          <Grid>
            <Row>
              <Col>
                <Card style={styles.card}>
                  <CardItem style={styles.cardItem}>
                    <Col>
                      <Text style={styles.topCardLeftCol}>CREATED DATE</Text>
                    </Col>
                    <Col>
                      <Text style={styles.topCardRightCol}>
                        {this.state.dataSource.reservation.created_date}
                        {'   '}
                        {this.state.dataSource.reservation.created_time}
                      </Text>
                    </Col>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                    <Col style={{margin: 0, padding: 0}}>
                      <Text style={styles.topCardLeftCol}>
                        <Text style={styles.topCardLeftCol}>
                          RESERVATION DATE
                        </Text>
                      </Text>
                    </Col>
                    <Col>
                      <Text style={styles.topCardRightCol}>
                        {this.state.dataSource.reservation.reservation_date}

                        {'   '}
                        {this.state.dataSource.reservation.reservation_time}
                      </Text>
                    </Col>
                  </CardItem>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col style={styles.leftCol}>
                <Text h4 h4Style={{fontSize: 20}}>
                  {this.state.dataSource.reservation.title}{' '}
                  {this.state.dataSource.reservation.first_name}{' '}
                  {this.state.dataSource.reservation.last_name}
                </Text>
                <Text> {this.state.dataSource.reservation.email}</Text>
                <Text> {this.state.dataSource.reservation.mobile}</Text>
              </Col>
            </Row>

            <Row>
              <Col style={styles.middleCol}>
                <Button
                  bordered
                  block
                  danger
                  style={styles.callBtn}
                  onPress={() => {
                    Linking.openURL(`tel:${this.state.mobileNo}`);
                  }}>
                  <Text style={{color: '#da092a'}}>Call</Text>
                </Button>
              </Col>
            </Row>

            <List>
              <List style={{backgroundColor: '#f3f3f3', paddingBottom: 5}}>
                <Row style={{paddingTop: 5, marginRight: 18.5}}>
                  <Col>
                    <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
                      NUMBER OF GUEST
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{alignSelf: 'flex-end', fontWeight: 'bold'}}>
                      {this.state.dataSource.reservation.no_of_guest}
                    </Text>
                  </Col>
                </Row>
              </List>
            </List>

            {this.state.dataSource.reservation.special_request && (
              <Row style={{paddingTop: 20}}>
                <Col style={styles.leftCol}>
                  <Text h4 h4Style={{fontSize: 20}}>
                    SPECIAL REQUEST
                  </Text>
                  <Text>
                    {this.state.dataSource.reservation.special_request}
                  </Text>
                </Col>
              </Row>
            )}

            <Row style={{marginTop: 30}}>
              <Col style={styles.leftCol}>
                <CustomButton title="ACCEPT" />
              </Col>
              <Col style={styles.leftCol}>
                <CustomButton title="REJECT" />
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#da092a',
  },
  cardItem: {
    borderRadius: 10,
    padding: 0,
    height: 35,
    backgroundColor: '#da092a',
  },
  container: {
    marginLeft: 5,
    marginRight: 5,
  },

  restaurantName: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  topCardLeftCol: {
    justifyContent: 'flex-start',
    color: '#fff',
    fontWeight: 'bold',
  },

  topCardRightCol: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    color: '#fff',
    fontWeight: 'bold',
  },

  leftCol: {
    justifyContent: 'flex-start',
    marginLeft: 5,
    marginTop: 2,
  },
  middleCol: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  callBtn: {
    color: '#da092a',
    width: 80,
    height: 35,
    marginBottom: 20,
    marginTop: 5,
    alignSelf: 'center',
    borderRadius: 10,
  },

  scrollView: {
    maxHeight: 230,
  },
});
