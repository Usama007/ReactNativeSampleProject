import React, {Component} from 'react';
import {
  Card,
  Body,
  CardItem,
  DatePicker,
  Item,
  Form,
  Label,
  Input,
  Icon,
  Right,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import CustomButton from '../../common/customButtom';
import moment from 'moment';
export default class CustomDateRange extends Component {
  constructor(props) {
    super(props);
    // this.state = {chosenDate: new Date()};
    this.state = {
      dateFrom: moment().format('DD-MM-YYYY'),
      dateTo: moment().format('DD-MM-YYYY'),
      dateToMinYear: moment().format('YYYY'),
      dateToMinMonth: moment().format('MM'),
      dateToMinDay: moment().format('DD'),
    };
    this.setFromDate = this.setFromDate.bind(this);
    this.setToDate = this.setToDate.bind(this);
  }
  setFromDate(newDate) {
    // alert(moment(newDate).format('DD-MM-YYYY'));
    // this.props.dateFrom = moment(newDate).format('DD-MM-YYYY');
    this.setState({dateFrom: moment(newDate).format('DD-MM-YYYY')});
    this.setState({
      dateToMinYear: moment(newDate).format('YYYY'),
      dateToMinMonth: moment(newDate).format('MM'),
      dateToMinDay: moment(newDate).format('DD'),
    });

    // alert(JSON.stringify(this.state));
  }

  setToDate(newDate) {
    this.setState({dateTo: moment(newDate).format('DD-MM-YYYY')});
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
                      SELECT DATE RANGE
                    </Text>
                  </Body>
                </CardItem>
              </Card>

              <Row style={styles.row}>
                <Col>
                  <Form>
                    <Item fixedLabel>
                      <Label>FROM DATE</Label>
                      <DatePicker
                        defaultDate={new Date()}
                        // minimumDate={new Date(2018, 1, 1)}
                        maximumDate={new Date()}
                        locale={'en'}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={'fade'}
                        androidMode={'calendar'}
                        placeHolderText="DD-MM-yyyy"
                        textStyle={{color: '#da092a'}}
                        placeHolderTextStyle={{color: '#d3d3d3'}}
                        onDateChange={this.setFromDate}
                        disabled={false}
                        style={{backgroundColor: '#da092a', color: '#da092a'}}
                      />
                      <Right>
                        <Icon active name="calendar" />
                      </Right>
                    </Item>
                    <Item fixedLabel>
                      <Label>TO DATE</Label>
                      <DatePicker
                        defaultDate={new Date()}
                        minimumDate={
                          new Date(
                            parseInt(this.state.dateToMinYear),
                            parseInt(this.state.dateToMinMonth) - 1,
                            parseInt(this.state.dateToMinDay) + 1,
                          )
                        }
                        maximumDate={new Date()}
                        locale={'en'}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={'fade'}
                        androidMode={'default'}
                        placeHolderText="DD-MM-yyyy"
                        textStyle={{color: '#da092a'}}
                        placeHolderTextStyle={{color: '#d3d3d3'}}
                        onDateChange={this.setToDate}
                        disabled={false}
                      />
                      <Right>
                        <Icon active name="calendar" />
                      </Right>
                    </Item>
                  </Form>
                </Col>
              </Row>
              {/* <Row>
                <Body></Body>
              </Row> */}

              <Row>
                <Col style={styles.buttonColumn}>
                  <CustomButton
                    title="CLOSE"
                    onClick={() => this.props.onCloseModal()}
                  />
                </Col>
                <Col style={styles.buttonColumn}>
                  <CustomButton
                    title="SUBMIT"
                    onClick={() =>
                      this.props.onSubmitModal(
                        this.state.dateFrom,
                        this.state.dateTo,
                      )
                    }
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
  row: {
    paddingLeft: 15,
    paddingRight: 30,
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
    marginLeft: 15,
    marginRight: 15,
  },

  text: {
    alignSelf: 'center',
    fontSize: 16,
  },
});
