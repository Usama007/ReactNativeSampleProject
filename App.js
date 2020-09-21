import React from 'react';
import Config from 'react-native-config';
import Login from './components/login/login';
import Index from './components/admin-settings/index';
import HomeTabs from './components/tabs/homeTabs';
import TicketList from './components/admin-settings/ticket-manager/ticketList';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Root, StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import ReviewList from './components/admin-settings/review-manager/reviewList';
import OrderDetail from './components/tabs/onlineOrder/orderDetail';
import TicketDetail from './components/admin-settings/ticket-manager/ticketDetail';
import ReservationDetail from './components/tabs/reservationDetail';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();
export default class App extends React.Component {
  UNSAFE_componentWillMount() {
    Config.API_URL ='api url is assinged here';
   
  }
  render() {
    return (
      <Root>
        <StatusBar hidden={false} backgroundColor="#da092a" />
        <StyleProvider style={getTheme(material)}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Login"
                component={Login}
              />
              <Stack.Screen
                options={
                  (({route}) => ({title: route.params}),
                  {
                    headerLeft: null,
                    headerStyle: {
                      backgroundColor: '#da092a',
                    },
                    headerTintColor: '#fff',
                  })
                }
                name="HomeTabs"
                component={HomeTabs}
              />
              <Stack.Screen
                options={
                  (({route}) => ({title: route.params}),
                  {
                    // headerLeft: null,
                    headerStyle: {
                      backgroundColor: '#da092a',
                    },
                    headerTintColor: '#fff',
                  })
                }
                name="Admin-settings"
                component={Index}
              />
              <Stack.Screen
                options={
                  (({route}) => ({title: route.params}),
                  {
                    // headerLeft: null,
                    headerStyle: {
                      backgroundColor: '#da092a',
                    },
                    headerTintColor: '#fff',
                  })
                }
                name="Ticket-list"
                component={TicketList}
              />
              <Stack.Screen
                options={
                  (({route}) => ({title: route.params}),
                  {
                    // headerLeft: null,
                    headerStyle: {
                      backgroundColor: '#da092a',
                    },
                    headerTintColor: '#fff',
                  })
                }
                name="Ticket-Detail"
                component={TicketDetail}
              />
              <Stack.Screen
                options={
                  (({route}) => ({title: route.params}),
                  {
                    headerStyle: {
                      backgroundColor: '#da092a',
                    },
                    headerTintColor: '#fff',
                  })
                }
                name="Review-list"
                component={ReviewList}
              />
              <Stack.Screen
                options={
                  (({route}) => ({title: route.params}),
                  {
                    headerStyle: {
                      backgroundColor: '#da092a',
                    },
                    headerTintColor: '#fff',
                  })
                }
                name="Order Detail"
                component={OrderDetail}
              />
              <Stack.Screen
                options={
                  (({route}) => ({title: route.params}),
                  {
                    headerStyle: {
                      backgroundColor: '#da092a',
                    },
                    headerTintColor: '#fff',
                  })
                }
                name="Reservation Detail"
                component={ReservationDetail}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </StyleProvider>
      </Root>
    );
  }
}
