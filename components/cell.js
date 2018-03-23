import React, { Component } from 'react';
import { View, ViewPropTypes, Text, StyleSheet } from 'react-native';

class Cell extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    borderStyle: ViewPropTypes.style,
  }

  render() {
    const {data, width, height, flex, style, textStyle} = this.props;
    const textDom = typeof data === 'string' ?(
        <Text style={[textStyle, styles.text]}>{data}</Text>
      ) : data ;
    let borderWidth,borderColor;
    if (this.props.borderStyle && this.props.borderStyle.borderWidth !== undefined) {
      borderWidth = this.props.borderStyle.borderWidth;
    } else {
      borderWidth = 1;
    }
    if (this.props.borderStyle && this.props.borderStyle.borderColor) {
      borderColor = this.props.borderStyle.borderColor;
    } else {
      borderColor = '#000';
    }


    return (
      <View style={[
        {
          borderLeftWidth: borderWidth,
          borderBottomWidth: borderWidth,
          borderTopWidth: borderWidth,
          borderRightWidth: borderWidth,
          borderColor: borderColor,
        },
        styles.cell,
        width && {width: width},
        height && {height: height},
        flex && {flex: flex},
        !width && !flex && !height && {flex: 1},
        style
      ]}>
        {textDom}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
  },
  text: {
    backgroundColor: 'transparent',
  },
})

export default Cell;
