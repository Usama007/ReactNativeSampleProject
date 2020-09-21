import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  Modal,
  AsyncStorage,
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Fab,
  Icon,
  ActionSheet,
} from 'native-base';
import CardListItem from '../../common/cardListItem';
import Config from 'react-native-config';
import moment from 'moment';
import Axios from 'axios';
import ShowMoreModal from './showMoreModal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomDateRange from './customDateRange';
var BUTTONS = [
  'Today',
  'Yesterday',
  'Last 7 days',
  'Last 30 days',
  'This Month',
  'Last Month',
  'Custom Range',
  'Close',
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class OnlineOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalVisible: false,
      modalName: '',
      startDate: moment().format('DD-MM-YYYY'),
      endDate: moment().format('DD-MM-YYYY'),
      dateFrom: moment().format('MMM DD,YYYY'),
      dateTo: moment().format('MMM DD,YYYY'),
      dataSource: [],
    };
    this.retrieveDataFromLocalStorage('UserDetails');
  }

  retrieveDataFromLocalStorage = async (objName) => {
    try {
      const value = await AsyncStorage.getItem(objName);
      if (value !== null) {
        let data = JSON.parse(value);
        Config.user_id = data.data.user_id;
        Config.owner_email = data.data.email;
        Config.rest_id = data.data.rest_id;
      }
    } catch (error) {}
  };

  state = {
    modalVisible: false,
  };

  UNSAFE_componentWillMount() {
    this.setState({loading: true});
    Axios.get(
      Config.API_URL +
        'funId=33&rest_id=' +
        Config.rest_id +
        '&start_date=' +
        this.state.startDate +
        '&end_date=' +
        this.state.endDate,
    )
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson.data,
        });
      })
      .catch((error) => console.log(error));
  }

  onCloseModal = () => {
    this.setModalVisible(!this.state.modalVisible);
  };

  setModalVisible = (visible, modalName) => {
    this.setState({modalVisible: visible, modalName: modalName});
  };

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

      case 'Yesterday':
        var dateTo = moment().format('DD-MM-YYYY');
        var dateFrom = moment().subtract(1, 'd').format('DD-MM-YYYY');

        this.setState({
          dateFrom: moment().format('MMM DD,YYYY'),
          dateTo: moment().subtract(1, 'd').format('MMM DD,YYYY'),
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

  getIcon = (order_type) => {
    if (order_type == 'Collection') {
      return 'ios-basket';
    } else {
      return 'ios-bicycle';
    }
  };

  render() {
    const {modalVisible, modalName} = this.state;
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#da092a" />
        </View>
      );
    }

    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            // this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {modalName == 'ShowMoreModal' && (
                <ShowMoreModal
                  data={this.state}
                  onCloseModal={this.onCloseModal}
                />
              )}

              {modalName == 'CustomDateRange' && (
                <CustomDateRange
                  data={this.state}
                  onCloseModal={this.onCloseModal}
                  onSubmitModal={(dateFrom, dateTo) => {
                    this.setModalVisible(!this.state.modalVisible);
                    // alert(dateFrom + ' ' + dateTo);

                    this.setState({
                      dateFrom: dateFrom,
                      dateTo: dateTo,
                    });

                    this.setState({startDate: dateFrom, endDate: dateTo}, () =>
                      this.UNSAFE_componentWillMount(),
                    );
                  }}
                />
              )}

              {/* <ShowMoreModal
                data={this.state}
                onCloseModal={this.onCloseModal}
              /> */}
            </View>
          </View>
        </Modal>

        <Content padder>
          <Card style={styles.card}>
            <CardItem style={styles.redCardItem}>
              <Body>
                <Text style={styles.redCardText}>
                  {this.state.dateFrom} - {this.state.dateTo}
                </Text>
                <Text style={styles.redCardText}>Total Amount</Text>
                <Text style={styles.redCardText}>
                  £
                  {this.state.dataSource.total
                    ? this.state.dataSource.total
                    : '0'}
                </Text>
                <Body>
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible(true, 'ShowMoreModal');
                    }}>
                    <Text style={styles.moreText}>MORE</Text>
                  </TouchableOpacity>
                </Body>
              </Body>
            </CardItem>
          </Card>
          <SafeAreaView>
            <ScrollView>
              {this.state.dataSource.orders && (
                <FlatList
                  data={this.state.dataSource.orders}
                  renderItem={({item}) => (
                    <CardListItem
                      title={item.customer_name}
                      second_text={item.postcode.trim()}
                      third_text={item.order_type}
                      fourth_text={`IN: ${item.order_in} :  OUT: ${item.order_out}`}
                      right_first_text={item.order_date}
                      right_second_text={`${item.payment_method} :  £${item.grand_total}`}
                      first_icon="place"
                      second_icon={this.getIcon(item.order_type)}
                      onClick={() =>
                        this.props.navigation.navigate('Order Detail', {
                          order_no: item.order_no,
                        })
                      }
                    />
                  )}
                  keyExtractor={(item) => item.order_no}
                />
              )}

              {!this.state.dataSource.orders && (
                <Card style={styles.card}>
                  <CardItem style={styles.cardItem}>
                    <Body style={styles.noOderCardBody}>
                      <Icon style={styles.noOrderIcon} name="ios-basket" />
                      <Text style={styles.noOrderText}>
                        {this.state.dataSource.msg}
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
              )}
            </ScrollView>
          </SafeAreaView>
        </Content>
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
  loader: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  card: {borderRadius: 10},
  redCardItem: {borderRadius: 10, backgroundColor: '#da092a'},
  cardItem: {borderRadius: 10},
  redCardText: {
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  moreText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    paddingTop: 10,
  },
  fab: {
    backgroundColor: '#da092a',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(163, 163, 163, 0.89)',
  },
  modalView: {
    height: 290,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
