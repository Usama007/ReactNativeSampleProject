import React, {Component} from 'react';
import {Card, Body, CardItem} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../common/customButtom';
import {FlatList} from 'react-native-gesture-handler';
export default class ShowMoreModal extends Component {
  constructor(props) {
    super(props);
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
                      {this.props.data.dateFrom} - {this.props.data.dateTo}
                    </Text>
                  </Body>
                </CardItem>
              </Card>

              <Row>
                <Col>
                  <Text style={styles.text}>Total Amount</Text>
                  <Text style={styles.text}>
                    £
                    {this.props.data.dataSource.total
                      ? this.props.data.dataSource.total
                      : '0'}
                  </Text>
                </Col>
                <Col>
                  <Text style={styles.text}>Total Orders</Text>
                  <Text style={styles.text}>
                    £
                    {this.props.data.dataSource.total
                      ? this.props.data.dataSource.total
                      : '0'}
                  </Text>
                </Col>
              </Row>

              <Row>
                <FlatList
                  data={this.props.data.dataSource.payment}
                  renderItem={({item}) => (
                    <Col>
                      <Text style={styles.text}>{item.payment_method}</Text>
                      <Text style={styles.text}>
                        £{item.amount ? item.amount : '0'}
                      </Text>
                    </Col>
                  )}
                  numColumns={
                    this.props.data.dataSource.status == '1'
                      ? this.props.data.dataSource.payment.length
                      : 1
                  }
                  keyExtractor={(item) => item.order_no}
                />
              </Row>

              <Row style={styles.row}>
                <Col>
                  <Text style={styles.text}>COLLECTION</Text>
                  <Text style={styles.text}>
                    {this.props.data.dataSource.status == '1'
                      ? this.props.data.dataSource.total_collection_order
                      : 0}
                  </Text>
                </Col>

                <Col>
                  <Text style={styles.text}>DELIVERY</Text>
                  <Text style={styles.text}>
                    {this.props.data.dataSource.status == '1'
                      ? this.props.data.dataSource.total_delivery_order
                      : 0}
                  </Text>
                </Col>
              </Row>

              <Row>
                <Col style={styles.buttonColumn}>
                  <CustomButton
                    title="CLOSE"
                    onClick={() => this.props.onCloseModal()}
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
    paddingLeft: 0,
    paddingRight: 0,
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

  text: {
    alignSelf: 'center',
    fontSize: 16,
  },
});
