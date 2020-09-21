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
  Textarea,
  Form,
  Input,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import CustomButton from '../../common/customButtom';
export default class CreateTicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: '',
    };
  }

  render() {
    return (
      <Grid>
        <Col style={styles.modalColHeight}>
          <Row>
            <Col>
              <Card style={styles.headerCard}>
                <CardItem style={styles.headerCard}>
                  <Body>
                    <Text style={{color: 'white', alignSelf: 'center'}}>
                      CREATE NEW TICKET
                    </Text>
                  </Body>
                </CardItem>
              </Card>
              <Form style={styles.form}>
                <Textarea
                  value={this.state.message}
                  onChangeText={(message) => this.setState({message})}
                  rowSpan={5}
                  bordered
                  placeholder="Write from here..."
                />
              </Form>
              <Row>
                <Col style={styles.buttonColumn}>
                  <CustomButton
                    title="Cancel"
                    onClick={() => this.props.onCloseModal()}
                  />
                </Col>
                <Col style={styles.buttonColumn}>
                  <CustomButton
                    title="Confirm"
                    onClick={() => this.props.onSubmitModal(this.state.message)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 1,
    margin: 7,
  },
  headerCard: {
    // borderRadius: 10,
    backgroundColor: '#da092a',
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  item: {
    borderRadius: 10,
    marginTop: 5,
  },
  marginTop: {
    marginTop: 15,
  },
  buttonColumn: {
    marginLeft: 7,
    marginRight: 7,
  },
});
