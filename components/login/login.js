import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  CheckBox,
  Text,
  Alert,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Input,
  Item,
  Icon,
  View,
  Button,
} from 'native-base';
import moment from 'moment';
import Config from 'react-native-config';
import Axios from 'axios';
const {width} = Dimensions.get('window');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
      rememberMe: true,
      dataSource: [],
    };
  }

  UNSAFE_componentWillMount() {
    this.isLoggedIn();
    this.retrieveDataFromLocalStorage('RememberMe');
  }

  login = () => {
    const {username, password} = this.state;
    if (username != '' && password != '') {
      this.setState({loading: true});
      Axios.get(
        Config.API_URL +
          'funId=37&username=' +
          username +
          '&password=' +
          password +
          '&device_id=' +
          '' +
          '&platform=' +
          '2' +
          '&token=' +
          '',
      )
        .then((responseJson) => {
          this.setState({
            loading: false,
            dataSource: responseJson.data,
          });
          const {dataSource, rememberMe} = this.state;
          if (dataSource.status == '1') {
            this.storeDataToLocalStorage('UserDetails', {
              isLoggedIn: true,
              data: dataSource.UserDetails,
            });
            if (rememberMe) {
              this.storeDataToLocalStorage('RememberMe', {
                username: username,
                password: password,
              });
            } else {
              this.removeDataFromLocalStorage('RememberMe');
            }
          } else {
            this.alert(dataSource.msg);
          }
        })
        .catch((error) => this.alert(error));
    } else {
      this.alert('Please provide username and password');
    }
  };

  storeDataToLocalStorage = async (objName, data) => {
    try {
      await AsyncStorage.setItem(objName, JSON.stringify(data));
      this.props.navigation.navigate('HomeTabs');
    } catch (error) {
      this.alert(error);
    }
  };

  retrieveDataFromLocalStorage = async (objName) => {
    try {
      const value = await AsyncStorage.getItem(objName);
      if (value !== null) {
        let data = JSON.parse(value);
        this.setState({
          rememberMe: true,
          username: data.username,
          password: data.password,
        });
      } else {
        this.setState({
          rememberMe: false,
          username: '',
          password: '',
        });
      }
    } catch (error) {}
  };

  isLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('UserDetails');
      if (value !== null) {
        let data = JSON.parse(value);
        if (data.isLoggedIn) {
          this.props.navigation.navigate('HomeTabs');
        } else {
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  removeDataFromLocalStorage = async (objName) => {
    try {
      const value = await AsyncStorage.removeItem(objName);
      this.setState({
        rememberMe: false,
        username: '',
        password: '',
      });
      return true;
    } catch (error) {}
  };

  alert = (message) => {
    Alert.alert('LOGIN FAILED!!!', message, [{text: 'OK'}], {
      cancelable: false,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#da092a" />
        </View>
      );
    }

    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Image
            style={styles.logo}
            source={require('../../assets/imgs/logo.png')}
          />
          <Form style={styles.form}>
            <Item rouned style={styles.item}>
              <Icon style={styles.textColor} name="person" />
              <Input
                value={this.state.username}
                onChangeText={(username) => this.setState({username})}
                style={styles.textColor}
                placeholderTextColor="#dddd"
                placeholder="Username"
                autoFocus={true}
              />
            </Item>
            <Item style={styles.item}>
              <Icon style={styles.textColor} name="lock" />
              <Input
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
                style={styles.textColor}
                placeholderTextColor="#dddd"
                placeholder="Password"
                secureTextEntry={true}
              />
            </Item>
          </Form>
          <Button
            onPress={this.login}
            style={styles.button}
            rounded
            block
            danger>
            <Text style={styles.textColor}>LOGIN</Text>
          </Button>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={this.state.rememberMe}
              onValueChange={() =>
                this.setState({
                  rememberMe: !this.state.rememberMe,
                })
              }
            />
            <Text style={styles.textColor}>Remember Me</Text>
          </View>
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText}>
              Copyright © {moment().format('YYYY')} Company Name.All rights
              reserved.{'\n'} Version 1.0
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#da092a',
  },
  content: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loader: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  logo: {
    alignSelf: 'center',
    width: width * 0.87,
    height: width * 0.127,
  },
  form: {
    marginTop: 5,
  },
  item: {
    marginTop: 5,
    width: width * 0.87,
  },
  textColor: {
    color: '#FFFFFF',
  },
  button: {marginLeft: 15, marginTop: 10, width: width * 0.87},
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  footerTextContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 11,
  },
});
