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
import CustomButton from '../../common/customButtom';
import {color} from 'react-native-reanimated';
import {Text} from 'react-native-elements';
import Axios from 'axios';
import Config from 'react-native-config';
export default class OrderDetail extends Component {
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
      order_no: this.props.route.params.order_no,
    };

    let data = this.props.route.params.order_no;
    //alert(JSON.stringify(data));
  }
  componentDidMount() {
    this.setState({loading: true});
    Axios.get(Config.API_URL + 'funId=34&order_id=' + this.state.order_no)
      //   .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson.data,
          customerName: responseJson.data.user_details.full_name.trim(),
          address: responseJson.data.user_details.address1.trim(),
          postcode: responseJson.data.user_details.postcode.trim(),
          mobileNo: responseJson.data.user_details.mobile_no.trim(),
        });
        let data = this.state;
        // console.warn(this.state.customerName);
      })
      .catch((error) => console.log(error));
  }

  renderItem = ({item}) => {
    return (
      <ListItem style={{marginLeft: 5, maxHeight: 35}}>
        <Row>
          <Col>
            <Text style={{marginLeft: 5}}>1</Text>
          </Col>
          <Col>
            <Text style={{alignSelf: 'flex-start', fontSize: 12}}>
              {item.dish_name}
            </Text>
          </Col>
          <Col>
            <Text
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                paddingVertical: 5,
                justifyContent: 'center',
              }}>
              £0.90
            </Text>
          </Col>
        </Row>
      </ListItem>
    );
  };

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
                  <CardItem style={styles.card}>
                    <Body>
                      <Text style={styles.restaurantName}>
                        {this.state.dataSource.restaurant_name}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                    <Col>
                      <Text style={styles.topCardLeftCol}>
                        {this.state.dataSource.order_date}
                      </Text>
                    </Col>
                    <Col>
                      <Text style={styles.topCardRightCol}>
                        {this.state.dataSource.order_type}
                      </Text>
                    </Col>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                    <Col style={{margin: 0, padding: 0}}>
                      <Text style={styles.topCardLeftCol}>
                        IN TIME: {this.state.dataSource.order_time}
                      </Text>
                    </Col>
                    <Col>
                      <Text style={styles.topCardRightCol}>
                        OUT TIME: {this.state.dataSource.delivery_time}
                      </Text>
                    </Col>
                  </CardItem>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col style={styles.leftCol}>
                <Text h4 h4Style={{fontSize: 20}}>
                  {this.state.customerName}
                </Text>
                <Text> {this.state.address}</Text>
                <Text> {this.state.postcode}</Text>
                <Text> {this.state.mobileNo}</Text>
              </Col>
            </Row>

            {/* 
            <Row>
              <FlatList
                data={this.state.dataSource.user_details}
                renderItem={({item}) => (
                  <Col style={styles.leftCol}>
                    <Text h4 h4Style={{fontSize: 20}}>
                      {this.state.dataSource.user_details.full_name.trim()}
                    </Text>
                    <Text>
                      {this.state.dataSource.user_details.address1.trim()}
                    </Text>
                    <Text>
                      {this.state.dataSource.user_details.postcode.trim()}
                    </Text>
                    <Text>
                      {this.state.dataSource.user_details.mobile_no.trim()}
                    </Text>
                  </Col>
                )}
                keyExtractor={(item, index) =>
                  this.state.dataSource.user_details.email
                }
              />
            </Row> */}

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
              <ListItem style={{marginLeft: 5, height: 31}}>
                <Row>
                  <Col>
                    <Text h4 h4Style={{fontSize: 15}}>
                      QTY
                    </Text>
                  </Col>
                  <Col>
                    <Text h4 h4Style={{fontSize: 15, alignSelf: 'center'}}>
                      DISH
                    </Text>
                  </Col>
                  <Col>
                    <Text h4 h4Style={{fontSize: 15, alignSelf: 'flex-end'}}>
                      PRICE
                    </Text>
                  </Col>
                </Row>
              </ListItem>
              <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                  <FlatList
                    data={this.state.dataSource.item_list}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.dish_id}
                  />
                </ScrollView>
              </SafeAreaView>
              <List style={{backgroundColor: '#f3f3f3', paddingBottom: 5}}>
                <Row style={{paddingTop: 5, marginRight: 18.5}}>
                  <Col>
                    <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
                      SUBTOTAL
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{alignSelf: 'flex-end', fontWeight: 'bold'}}>
                      £{this.state.dataSource.total}
                    </Text>
                  </Col>
                </Row>
                <Row style={{paddingTop: 5, marginRight: 18.5}}>
                  <Col>
                    <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
                      TOTAL
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{alignSelf: 'flex-end', fontWeight: 'bold'}}>
                      £{this.state.dataSource.grand_total}
                    </Text>
                  </Col>
                </Row>
                <Row style={{paddingTop: 5, marginRight: 18.5}}>
                  <Col>
                    <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
                      TOTAL ITEMS
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{alignSelf: 'flex-end', fontWeight: 'bold'}}>
                      {this.state.dataSource.total_ordered_quantity}
                    </Text>
                  </Col>
                </Row>
                <Row style={{paddingTop: 5, marginRight: 18.5}}>
                  <Col>
                    <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
                      PAYMENT
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{alignSelf: 'flex-end', fontWeight: 'bold'}}>
                      {this.state.dataSource.payment_method}
                    </Text>
                  </Col>
                </Row>
              </List>
            </List>

            {this.state.dataSource.comments && (
              <Row style={{paddingTop: 20}}>
                <Col style={styles.leftCol}>
                  <Text h4 h4Style={{fontSize: 20}}>
                    SPECIAL REQUEST
                  </Text>
                  <Text>{this.state.dataSource.comments}</Text>
                </Col>
              </Row>
            )}
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
    alignSelf: 'center',
    borderRadius: 10,
  },

  scrollView: {
    maxHeight: 230,
  },
});
