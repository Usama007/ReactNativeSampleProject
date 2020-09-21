import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TouchableOpacityBase,
  TouchableHighlightBase,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Switch,
  Card,
} from 'native-base';

import {Icon} from 'react-native-elements';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {TouchableHighlight} from 'react-native-gesture-handler';

export default class CardListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.onClick();
        }}>
        <Card style={styles.card}>
          <ListItem icon noBorder style={styles.listItem}>
            <Body>
              <Text style={styles.bold}>{this.props.title}</Text>
            </Body>
          </ListItem>

          <ListItem icon noBorder style={styles.listItem}>
            {/* <Left>
            <Icon name={this.props.first_icon} />
          </Left> */}
            {this.props.first_icon && (
              <Left>
                <Icon name={this.props.first_icon} />
              </Left>
            )}
            <Body>
              <Text style={styles.textStyle}>{this.props.second_text}</Text>
            </Body>
            <Right>
              <Text style={styles.textStyle}>
                {this.props.right_first_text}
              </Text>
            </Right>
          </ListItem>

          <ListItem icon noBorder style={{margin: '0%', padding: '0%'}}>
            {/* <Left>
            <Icon name={this.props.second_icon} type="ionicon" />
          </Left> */}

            {this.props.second_icon && (
              <Left>
                <Icon name={this.props.second_icon} type="ionicon" />
              </Left>
            )}
            <Body>
              <Text style={styles.textStyle}>{this.props.third_text}</Text>
            </Body>

            <Right>
              <Text style={styles.textStyle}>
                {/* {data.payment_method}: {data.grand_total} */}
                {this.props.right_second_text}
              </Text>
            </Right>
          </ListItem>

          {this.props.fourth_text && (
            <ListItem style={styles.listItem}>
              <Text style={styles.textStyle}>{this.props.fourth_text}</Text>
            </ListItem>
          )}
        </Card>
      </TouchableHighlight>
    );
  }
}

// {modalName == 'ReservationSettings' && (
//   <ReservationSettingsModal onSubmitModal={this.onSubmitModal} />
// )}

const styles = StyleSheet.create({
  card: {
    marginLeft: 3,
    marginRight: 3,
    borderRadius: 10,
  },
  colRight: {
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItem: {
    margin: 0,
    padding: 0,
    height: 30,
  },
  textStyle: {
    fontSize: 15,
  },
});
