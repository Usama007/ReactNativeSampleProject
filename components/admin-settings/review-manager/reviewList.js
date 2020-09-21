import React, {Component} from 'react';
import {
  Container,
  Label,
  Left,
  Card,
  Item,
  Textarea,
  ListItem,
  Body,
  CardItem,
  Button,
  Form,
  Input,
  Content,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import CustomButton from '../../common/customButtom';
import {Icon, Rating, AirbnbRating} from 'react-native-elements';
export default class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.setState({loading: true});

    fetch(
      Config.API_URL +'funId=102&rest_id=645',
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson,
        });
        var data = this.state;
      });
  }

  renderItem = ({item}) => {
    return (
      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Body>
            {item.name != '' && item.name != null && (
              <ListItem icon noBorder style={styles.listItem}>
                <Left>
                  <Icon name="person" type="ionicons" />
                </Left>
                <Text>{item.name}</Text>
              </ListItem>
            )}

            {item.email != '' && item.email != null && (
              <ListItem icon noBorder style={styles.listItem}>
                <Left>
                  <Icon name="email" type="ionicons" />
                </Left>
                <Text>{item.email}</Text>
              </ListItem>
            )}

            <Row>
              <Col
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <Text style={styles.rating_title}>Quality of Food</Text>
                <Rating
                  onFinishRating={this.ratingCompleted}
                  imageSize={20}
                  startingValue={item.quality_of_food}
                  readonly
                  //   ratingCount="3"
                  ratingColor={'#da092a'}
                  type="custom"
                  style={styles.rating}
                />
              </Col>
              <Col
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.rating_title}>Quality of Service</Text>
                <Rating
                  onFinishRating={this.ratingCompleted}
                  imageSize={20}
                  startingValue={item.quality_of_service}
                  readonly
                  //   ratingCount="3"
                  ratingColor={'#da092a'}
                  type="custom"
                  style={styles.rating}
                />
              </Col>
              <Col
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Text style={styles.rating_title}>Value of Money</Text>
                <Rating
                  onFinishRating={this.ratingCompleted}
                  imageSize={20}
                  startingValue={item.value_of_money}
                  readonly
                  //   ratingCount="5"
                  ratingColor={'#da092a'}
                  ratingBackgroundColor={'#da092a'}
                  type="custom"
                  style={styles.rating}
                />
              </Col>
            </Row>

            {/* {this.props.first_icon && (
            <Left>
              <Icon name={this.props.first_icon} />
            </Left>
          )} */}

            {item.review_comment != '' && (
              <Row>
                <Col>
                  <ListItem noBorder style={styles.listItem}>
                    <Text>Comment: {item.review_comment}</Text>
                  </ListItem>
                </Col>
              </Row>
            )}

            <Row>
              <Col>
                <Textarea
                  style={styles.textArea}
                  rowSpan={5}
                  bordered
                  placeholder="Write your reply from here..."
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <CustomButton title="Unpublished" />
              </Col>
              <Col>
                <CustomButton title="Reply" />
              </Col>
            </Row>
          </Body>
        </CardItem>
      </Card>
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
        <Content style={styles.content}>
          <FlatList
            data={this.state.dataSource.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.id}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  content: {},
  listItem: {
    marginLeft: 0,
  },

  card: {
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 1,
    padding: 0,
  },
  cardItem: {
    borderRadius: 10,
    padding: 0,
  },
  rating_title: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  rating: {
    paddingTop: 5,
    paddingBottom: 0,
    marginBottom: 0,
    paddingVertical: 0,
    borderColor: '#da092a',
  },
  textArea: {
    marginTop: 10,
    marginBottom: 10,
    height: 90,
    borderRadius: 10,
  },
});
