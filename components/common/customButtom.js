import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, Icon} from 'native-base';
import {act} from 'react-test-renderer';

export default class CustomButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button
        block
        style={styles.btn}
        onPress={() => {
          this.props.onClick();
        }}>
        <Text>{this.props.title}</Text>
        {this.props.icon && <Icon name={this.props.icon} />}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    margin: 1,
    backgroundColor: '#da092a',
    borderRadius: 10,
  },
});
