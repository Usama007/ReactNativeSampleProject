import React, {Component} from 'react';

import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {
  Container,
  Label,
  Content,
  Card,
  Item,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  Switch,
  Form,
  Input,
} from 'native-base';

import ChangeDevicePinModal from './modals/changeDevicePinModal';
import ChangeBackofficePassModal from './modals/changeBackofficePassModal';
import AddBranchModal from './modals/addBranchModal';
import ReservationSettingsModal from './modals/reservationSettingsModal';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalName: '',
    };
    this.onSubmitModal = this.onSubmitModal.bind(this);
  }

  onSubmitModal = () => {
    this.setModalVisible(!this.state.modalVisible);
  };

  state = {
    modalVisible: false,
  };

  setModalVisible = (visible, modalName) => {
    this.setState({modalVisible: visible, modalName: modalName});
  };

  render() {
    const {modalVisible, modalName} = this.state;
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
              {modalName == 'ChangeBackOfficePass' && (
                <ChangeBackofficePassModal onSubmitModal={this.onSubmitModal} />
              )}

              {modalName == 'ChangeDevicePin' && (
                <ChangeDevicePinModal onSubmitModal={this.onSubmitModal} />
              )}

              {modalName == 'AddBranch' && (
                <AddBranchModal onSubmitModal={this.onSubmitModal} />
              )}

              {modalName == 'ReservationSettings' && (
                <ReservationSettingsModal onSubmitModal={this.onSubmitModal} />
              )}
            </View>
          </View>
        </Modal>

        <Content>
          <Card style={styles.card}>
            <List>
              <ListItem
                onPress={() => {
                  this.setModalVisible(true, 'ChangeBackOfficePass');
                }}>
                <Left>
                  <Text>Change Backoffice Password</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>

              <ListItem
                onPress={() => {
                  this.setModalVisible(true, 'ChangeDevicePin');
                }}>
                <Left>
                  <Text>Change Device Pin</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem
                onPress={() => {
                  this.setModalVisible(true, 'ReservationSettings');
                }}>
                <Left>
                  <Text>Reservation Settings</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem
                onPress={() => {
                  this.props.navigation.navigate('Ticket-list');
                }}>
                <Left>
                  <Text>Ticket Manager</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem
                onPress={() => {
                  this.props.navigation.navigate('Review-list');
                }}>
                <Left>
                  <Text>Review Manager</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem
                onPress={() => {
                  this.setModalVisible(true, 'AddBranch');
                }}>
                <Left>
                  <Text>Add Branch</Text>
                </Left>
                <Right>
                  <Icon name="add" />
                </Right>
              </ListItem>
            </List>
          </Card>

          <Card style={styles.card}>
            <List>
              <ListItem>
                <Left>
                  <Text>Delete Order</Text>
                </Left>
                <Right>
                  <Switch value={false} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Online Ordering</Text>
                </Left>
                <Right>
                  <Switch value={false} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Remeber Password</Text>
                </Left>
                <Right>
                  <Switch value={true} />
                </Right>
              </ListItem>
            </List>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  modalColHeight: {
    height: 200,
  },
});

export default Index;
