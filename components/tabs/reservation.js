import React, {Component} from 'react';
import {
  Container,
  Content,
  Card,
  Icon,
  Fab,
  Body,
  CardItem,
  Tab,
  Tabs,
  Right,
  Left,
  ActionSheet,
  Header,
  Title,
} from 'native-base';
import {Col, Row} from 'react-native-easy-grid';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  FlatList,
} from 'react-native';
import moment from 'moment';
import Axios from 'axios';
import Config from 'react-native-config';
import {TouchableHighlight} from 'react-native-gesture-handler';

var BUTTONS = [
  'Today',
  'Tomorrow',
  'Next week',
  'This Month',
  'Next month',
  'Next 3 month',
  'Next 6 month',
  'Next year',
  'Custom Range',
  'Close',
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
export default class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
      acceptedToday: [],
      acceptedTomorrow: [],
      acceptedUpcoming: [],
      pendingToday: [],
      pendingTomorrow: [],
      pendingUpcoming: [],
      rejectedToday: [],
      rejectedTomorrow: [],
      rejectedUpcoming: [],
      total: 0,
      startDate: '',
      endDate: '',
      dateFrom: moment().format('MMM DD,YYYY'),
      dateTo: moment().format('MMM DD,YYYY'),
      msg: '',
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({loading: true});

    // console.warn(
    //   Config.API_URL +
    //     'funId=86&rest_id=' +
    //     Config.rest_id +
    //     '&start_date=' +
    //     this.state.startDate +
    //     '&end_date=&status=' +
    //     this.state.endDate,
    // );

    Axios.get(
      Config.API_URL +
        'funId=86&rest_id=' +
        Config.rest_id +
        '&start_date=' +
        this.state.startDate +
        '&end_date=' +
        this.state.endDate +
        '&status=',
    ).then((responseJson) => {
      console.warn(responseJson);
      if (responseJson.data.status != 'Failed') {
        this.setState({
          loading: false,
          msg: '',
          dataSource: responseJson.data.reservation.list,
          acceptedToday: [responseJson.data.reservation.list.accepted.today],
          acceptedTomorrow: [
            responseJson.data.reservation.list.accepted.tomorrow,
          ],
          acceptedUpcoming: [
            responseJson.data.reservation.list.accepted.upcoming,
          ],
          pendingToday: [responseJson.data.reservation.list.pending.today],
          pendingTomorrow: [
            responseJson.data.reservation.list.pending.tomorrow,
          ],
          pendingUpcoming: [
            responseJson.data.reservation.list.pending.upcoming,
          ],
        });
      } else {
        console.warn(responseJson);
        this.setState({
          loading: false,
          dataSource: [],
          msg: responseJson.data.msg,
        });
      }
      // this.setState({
      //   loading: false,
      //   dataSource: responseJson.data.reservation.list,
      //   acceptedToday: [responseJson.data.reservation.list.accepted.today],
      //   acceptedTomorrow: [
      //     responseJson.data.reservation.list.accepted.tomorrow,
      //   ],
      //   acceptedUpcoming: [
      //     responseJson.data.reservation.list.accepted.upcoming,
      //   ],
      //   pendingToday: [responseJson.data.reservation.list.pending.today],
      //   pendingTomorrow: [responseJson.data.reservation.list.pending.tomorrow],
      //   pendingUpcoming: [responseJson.data.reservation.list.pending.upcoming],
      // });
      // var data = [];
    });
  }

  filter = (param) => {
    switch (param) {
      case 'Today':
        var dateTo = moment().format('DD-MM-YYYY');
        var dateFrom = moment().format('DD-MM-YYYY');
        this.setState({
          dateFrom: moment().format('MMM DD,YYYY'),
          dateTo: moment().format('MMM DD,YYYY'),
        });

        this.setState({startDate: dateFrom, endDate: dateTo}, () =>
          this.UNSAFE_componentWillMount(),
        );

        break;

      case 'Tomorrow':
        var dateTo = moment().add(1, 'd').format('DD-MM-YYYY');
        var dateFrom = moment().add(1, 'd').format('DD-MM-YYYY');

        this.setState({
          dateFrom: moment().add(1, 'd').format('MMM DD,YYYY'),
          dateTo: moment().add(1, 'd').format('MMM DD,YYYY'),
        });

        this.setState({startDate: dateFrom, endDate: dateTo}, () =>
          this.UNSAFE_componentWillMount(),
        );

        break;

      case 'Last 7 days':
        var dateTo = moment().format('DD-MM-YYYY');
        var dateFrom = moment().subtract(7, 'd').format('DD-MM-YYYY');

        this.setState({
          dateFrom: moment().subtract(7, 'd').format('MMM DD,YYYY'),
          dateTo: moment().format('MMM DD,YYYY'),
        });

        this.setState({startDate: dateFrom, endDate: dateTo}, () =>
          this.UNSAFE_componentWillMount(),
        );

        break;

      case 'Last 30 days':
        var dateTo = moment().format('DD-MM-YYYY');
        var dateFrom = moment().subtract(30, 'd').format('DD-MM-YYYY');

        this.setState({
          dateFrom: moment().subtract(30, 'd').format('MMM DD,YYYY'),
          dateTo: moment().format('MMM DD,YYYY'),
        });

        this.setState({startDate: dateFrom, endDate: dateTo}, () =>
          this.UNSAFE_componentWillMount(),
        );
        break;

      case 'This Month':
        var dateTo = moment().format('DD-MM-YYYY');
        var dateFrom = moment().startOf('month').format('DD-MM-YYYY');

        this.setState({
          dateFrom: moment().startOf('month').format('MMM DD,YYYY'),
          dateTo: moment().format('MMM DD,YYYY'),
        });

        this.setState({startDate: dateFrom, endDate: dateTo}, () =>
          this.UNSAFE_componentWillMount(),
        );
        break;

      case 'Last Month':
        var dateFrom = moment()
          .subtract(1, 'month')
          .startOf('month')
          .format('DD-MM-YYYY');
        var dateTo = moment()
          .subtract(1, 'month')
          .endOf('month')
          .format('DD-MM-YYYY');

        this.setState({
          dateFrom: moment()
            .subtract(1, 'month')
            .startOf('month')
            .format('MMM DD,YYYY'),
          dateTo: moment()
            .subtract(1, 'month')
            .endOf('month')
            .format('MMM DD,YYYY'),
        });

        this.setState({startDate: dateFrom, endDate: dateTo}, () =>
          this.UNSAFE_componentWillMount(),
        );
        break;

      case 'Custom Range':
        this.setModalVisible(true, 'CustomDateRange');
        break;

      default:
        this.setState({
          startDate: moment().format('DD-MM-YYYY'),
          endDate: moment().format('DD-MM-YYYY'),
          dateFrom: moment().format('DD-MM-YYYY'),
          dateTo: moment().format('DD-MM-YYYY'),
        });
    }
  };

  renderItem = (total, item, day) => {
    if (total != '0') {
      return (
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Reservation Detail')}>
          <Card style={styles.card}>
            <CardItem header bordered style={styles.cardRedHeader}>
              <Row>
                <Col>
                  <Text style={styles.redHeaderText}>{day}</Text>
                </Col>
                <Right>
                  <Col>
                    <Text style={styles.redHeaderText}>{total}</Text>
                  </Col>
                </Right>
              </Row>
            </CardItem>
            <CardItem icon>
              <Left>
                <Icon style={styles.icon} name="person" />
                <Text>
                  {item.title} {item.first_name} {item.last_name}
                </Text>
              </Left>
              <Right>
                <Icon style={styles.icon} name="thumbs-up" />
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Icon style={styles.icon} name="call" />
                <Text>{item.mobile}</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Icon style={styles.icon} name="mail" />
                <Text>{item.email}</Text>
              </Left>
            </CardItem>
            <CardItem style={styles.cardItemBottom}>
              <Left>
                <Text style={styles.cardBottomText}>
                  Guest {item.no_of_guest}
                </Text>
              </Left>
              <Body>
                <Text style={styles.cardBottomText}>
                  {item.reservation_date}
                </Text>
              </Body>
              <Right>
                <Text style={styles.cardBottomText}>
                  {item.reservation_time}
                </Text>
              </Right>
            </CardItem>
          </Card>
        </TouchableHighlight>
      );
    }
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
      <Container>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.title}>
              {this.state.dateFrom} - {this.state.dateTo}
            </Title>
          </Body>
        </Header>

        <Tabs>
          <Tab
            heading="CONFIRMED"
            textStyle={{color: '#7a7a7a'}}
            tabStyle={{backgroundColor: '#fff'}}
            activeTabStyle={{backgroundColor: '#fff'}}
            activeTextStyle={{
              color: 'red',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            <Container>
              {this.state.msg == '' && (
                <Content padder>
                  <FlatList
                    data={this.state.acceptedToday}
                    renderItem={({item, index}) =>
                      this.renderItem(item.total, item.list[index], 'TODAY')
                    }
                    keyExtractor={(item, index) => item.id}
                  />
                  <FlatList
                    data={this.state.acceptedTomorrow}
                    renderItem={({item, index}) =>
                      this.renderItem(item.total, item.list[index], 'TOMORROW')
                    }
                    keyExtractor={(item, index) => item.id}
                  />
                  <FlatList
                    data={this.state.acceptedUpcoming}
                    renderItem={({item, index}) =>
                      this.renderItem(item.total, item.list[index], 'UPCOMMING')
                    }
                    keyExtractor={(item, index) => item.id}
                  />
                </Content>
              )}

              {this.state.msg != '' && (
                <Content padder>
                  <Card style={styles.noCard}>
                    <CardItem style={styles.noCardItem}>
                      <Body style={styles.noOderCardBody}>
                        <Icon style={styles.noOrderIcon} name="ios-calendar" />
                        <Text style={styles.noOrderText}>{this.state.msg}</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </Content>
              )}
            </Container>
          </Tab>
          <Tab
            heading="UNCONFIRMED"
            textStyle={{color: '#7a7a7a'}}
            tabStyle={{backgroundColor: '#fff'}}
            activeTabStyle={{backgroundColor: '#fff'}}
            activeTextStyle={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
            <Container>
              <Content padder>
                <FlatList
                  data={this.state.pendingToday}
                  renderItem={({item, index}) =>
                    this.renderItem(item.total, item.list[index], 'TODAY')
                  }
                  keyExtractor={(item, index) => item.id}
                />
                <FlatList
                  data={this.state.pendingTomorrow}
                  renderItem={({item, index}) =>
                    this.renderItem(item.total, item.list[index], 'TOMORROW')
                  }
                  keyExtractor={(item, index) => item.id}
                />
                <FlatList
                  data={this.state.pendingUpcoming}
                  renderItem={({item, index}) =>
                    this.renderItem(item.total, item.list[index], 'UPCOMING')
                  }
                  keyExtractor={(item, index) => item.id}
                />
              </Content>
            </Container>
          </Tab>
        </Tabs>

        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={styles.fab}
          position="bottomRight"
          onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: 'FILTER',
              },
              (buttonIndex) => {
                this.filter(BUTTONS[buttonIndex]);
              },
            )
          }>
          <Icon name="ios-list" />
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
  },
  title: {alignSelf: 'center', fontSize: 15},
  card: {borderRadius: 10},
  cardRedHeader: {
    backgroundColor: '#da092a',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  cardItemBottom: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  redHeaderText: {
    color: '#ffff',
  },

  cardBottomText: {
    fontWeight: 'bold',
  },

  icon: {
    marginLeft: 0,
    color: '#da092a',
    fontSize: 20,
    paddingRight: 5,
  },
  listItem: {
    marginLeft: 0,
    marginRight: 0,
    margin: 0,
    padding: 0,
  },
  fab: {
    backgroundColor: '#da092a',
  },
  noCard: {
    borderRadius: 10,
  },
  noCardItem: {
    borderRadius: 10,
  },
  noOderCardBody: {
    alignItems: 'center',
  },
  noOrderIcon: {
    color: '#ddd',
    fontSize: 80,
  },
  noOrderText: {
    color: '#7a7a7a',
    fontSize: 20,
  },
});
