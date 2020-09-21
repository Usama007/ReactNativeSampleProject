import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  FlatList,
  Modal,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Picker,
  Icon,
  Item,
  Input,
  Root,
  Button,
} from 'native-base';
import CustomButton from '../../common/customButtom';
import CardListItem from '../../common/cardListItem';
import CreateTicketModal from '../modals//createTicketModal';

import {Col, Row, Grid} from 'react-native-easy-grid';
import Axios from 'axios';
import Config from 'react-native-config';

export default class TicketList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      startDate: '',
      endDate: '',
      dataSource: [],
      selected: '0',
      modalVisible: false,
      searchedText: '',
      complainStatus: '',
    };
    this.onSubmitModal = this.onSubmitModal.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.setState({loading: true});
    Axios.get(
      Config.API_URL +'funId=107&user_id=12514&pincode=1868&limit=0',
    )
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson.data,
        });
      })
      .catch((error) => console.log(error)); //to c
  }
  async filter(value) {
    this.setState({loading: true});

    await this.setState({
      complainStatus: value,
    });

    let isnum = /^\d+$/.test(this.state.searchedText);
    let ticket_id = '';
    let title = '';

    if (isnum) {
      ticket_id = this.state.searchedText;
    } else {
      title = this.state.searchedText;
    }

    let url = '';

    if (this.state.complainStatus == '0') {
      url =
      Config.API_URL +'funId=107&user_id=12514&pincode=1868&limit=0';
    } else {
      url =
      Config.API_URL +'funId=110&user_id=' +
        Config.user_id +
        '&ticket_id=' +
        ticket_id +
        '&title=' +
        title +
        '&complain_status=' +
        this.state.complainStatus +
        '&limit=0';
    }

    Axios.get(url)
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson.data,
        });
      })
      .catch((error) => console.log(error));
  }
  getStatus(status) {
    if (status === '1') {
      return 'PENDING';
    }
    if (status === '2') {
      return 'RESOLVED';
    }
    return 'CLOSED';
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  onSubmitModal = (message) => {
    this.setState({loading: true});

    fetch(
      Config.API_URL +'funId=108&file=' +
        JSON.stringify([]) +
        '&user_id=12514&ticket_id=0&pincode=pincode&message=' +
        message +
        '&complain_status=1&ticket_type=0',
    )
      .then((responseJson) => {
        this.setState({
          loading: false,
        });
        this.setModalVisible(!this.state.modalVisible);
        this.UNSAFE_componentWillMount();
      })
      .catch((error) => {
        console.warn(error);
        this.setModalVisible(!this.state.modalVisible);
        this.UNSAFE_componentWillMount();
      });
  };
  onCloseModal = () => {
    this.setModalVisible(!this.state.modalVisible);
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <Root>
        <StatusBar hidden={true} backgroundColor="#da092a" />
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
                <CreateTicketModal
                  onSubmitModal={this.onSubmitModal}
                  onCloseModal={this.onCloseModal}
                />
              </View>
            </View>
          </Modal>
          <Content style={styles.content}>
            <Card style={styles.Card}>
              <CardItem style={styles.cardItemRed}>
                <Body>
                  <Text>
                    Total number of ticket: {this.state.dataSource.total}
                  </Text>
                </Body>
              </CardItem>
            </Card>
            <Header style={styles.header} searchBar rounded>
              <Item>
                <Icon name="ios-search" />
                <Input
                  value={this.state.searchedText}
                  placeholder="Search ticket id or title..."
                  onChangeText={(searchedText) => {
                    this.setState({searchedText: searchedText});
                    // console.warn(this.state.searchedText);
                  }}
                  onSubmitEditing={this.filter.bind(this)}
                />
                <Icon name="book" />
              </Item>
              <Button transparent>
                <Text>Search</Text>
              </Button>
            </Header>

            <Grid>
              <Col>
                <CustomButton
                  title="Create Ticket"
                  icon="create"
                  onClick={() => this.setModalVisible(true)}
                />
              </Col>
              <Col>
                <Picker
                  mode="dropdown"
                  iosHeader="Select your SIM"
                  iosIcon={
                    <Icon name="arrow-down" style={{color: '#da092a'}} />
                  }
                  block
                  style={styles.picker}
                  selectedValue={this.state.complainStatus}
                  onValueChange={this.filter.bind(this)}>
                  <Picker.Item label="All Tickets" value="0" />
                  <Picker.Item label="Pending Tickets" value="1" />
                  <Picker.Item label="Resolved Tickets" value="2" />
                  <Picker.Item label="Closed Tickets" value="3" />
                </Picker>
              </Col>
            </Grid>

            {this.state.loading && (
              <ActivityIndicator size="large" color="#da092a" />
            )}

            {!this.state.loading && (
              <FlatList
                data={this.state.dataSource.complains}
                renderItem={({item}) => (
                  <CardListItem
                    title={`Title: ${item.title}`}
                    second_text={`Created Date: ${item.created_at}`}
                    third_text={`Last Update: ${item.updated_at}`}
                    right_first_text={`Ticket No: #${item.id}`}
                    right_second_text={this.getStatus(item.complain_status)}
                    onClick={() =>
                      this.props.navigation.navigate('Ticket-Detail')
                    }
                  />
                )}
                keyExtractor={(item, index) => item.id}
              />
            )}
          </Content>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    margin: 5,
  },
  Card: {
    borderRadius: 10,
  },
  cardItemRed: {
    borderRadius: 10,
  },
  white: {
    color: '#fff',
  },
  btn: {
    margin: 5,
    borderRadius: 10,
  },
  header: {
    backgroundColor: '#fff',
    margin: 2,
    marginBottom: 10,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(163, 163, 163, 0.89)',
  },
  modalView: {
    height: 250,
    margin: 15,
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

  picker: {
    color: '#da092a',
  },

  loader: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
