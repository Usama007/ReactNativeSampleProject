import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OnlineOrder from './onlineOrder/onlineOrder';
import Settings from './settings';
import Reservation from './reservation';
const Tab = createBottomTabNavigator();
export default class HomeTabs extends Component {
  UNSAFE_componentWillMount() {
    this.getLocalStorageData();
  }

  getLocalStorageData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserDetails');
      if (value !== null) {
        let data = JSON.parse(value);
        this.props.navigation.setOptions({title: data.data.restaurant_name});
      }
    } catch (error) {}
  };

  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Online Order') {
              iconName = focused ? 'ios-basket' : 'ios-basket';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings';
            } else if (route.name === 'Reservation') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#da092a',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Online Order" component={OnlineOrder} />
        <Tab.Screen name="Reservation" component={Reservation} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
  }
}
