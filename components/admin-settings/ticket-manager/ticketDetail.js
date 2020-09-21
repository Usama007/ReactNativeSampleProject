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
  Textarea,
  Form,
  Input,
  Left,
  Right,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {
  Alert,
  Modal,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  View,
} from 'react-native';
import {Text} from 'react-native-elements';

import CustomButton from '../../common/customButtom';
import Axios from 'axios';
export default class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.setState({loading: true});

    Axios.get(
      'http://smartrestaurantsolutions.com/mobileapi-test/Tigger.php?funId=109&ticket_id=10&limit=0',
    )
      //   .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson.data,
        });
        var data = this.state;
      });
  }

  renderItem = ({item}) => {
    return (
      <List>
        <ListItem itemDivider>
          <Col>
            <Text>{item.name}</Text>
          </Col>
          <Col>
            <Right
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
              }}>
              <Text>{item.updated_at}</Text>
            </Right>
          </Col>
        </ListItem>
        <ListItem noBorder>
          <Text>{item.text}</Text>
        </ListItem>
      </List>
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
      <Container>
        <Content padder>
          <Card style={styles.cardRedItem}>
            <CardItem style={styles.cardRedItem}>
              <Grid>
                <Row>
                  <Col>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginBottom: 5,
                      }}>
                      TICKET NO: #10
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginBottom: 5,
                        color: '#4dad4a',
                      }}>
                      {this.state.dataSource.complain_status == '1'
                        ? 'PENDING'
                        : this.state.dataSource.complain_status == '2'
                        ? 'RESOLVED'
                        : this.state.dataSource.complain_status == '3'
                        ? 'CLOSED'
                        : ''}
                    </Text>
                  </Col>

                  <Right>
                    <Col>
                      <Text>{this.state.dataSource.created_date}</Text>
                    </Col>
                  </Right>
                </Row>
                <Row>
                  <Col>
                    <Text>{this.state.dataSource.title}</Text>
                  </Col>
                </Row>
              </Grid>
            </CardItem>
          </Card>
          <Card style={styles.cardRedItem}>
            <CardItem header bordered style={{height: 20, borderRadius: 10}}>
              <Text>MAKE A COMMENT</Text>
            </CardItem>
            <CardItem style={styles.cardRedItem}>
              <Row>
                <Col>
                  <Textarea
                    rowSpan={5}
                    bordered
                    style={{height: 90, borderRadius: 10}}
                    placeholder="Write your comment from here..."
                  />
                </Col>
              </Row>
            </CardItem>
            <CardItem footer style={styles.cardRedItem}>
              <Row>
                <Col>
                  <CustomButton title="RESOLVE" />
                </Col>
                <Col>
                  <CustomButton title="ADD FILE" />
                </Col>
                <Col>
                  <CustomButton title="COMMENT" />
                </Col>
              </Row>
            </CardItem>
          </Card>
          <Card style={styles.cardRedItem}>
            <CardItem style={styles.cardRedItem}>
              <Row>
                <Col>
                  <FlatList
                    data={this.state.dataSource.complains}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.id}
                  />
                </Col>
              </Row>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cardRed: {
    // backgroundColor: '#da092a',
    borderRadius: 10,
  },
  cardRedItem: {
    // backgroundColor: '#da092a',
    borderRadius: 10,
  },
});
