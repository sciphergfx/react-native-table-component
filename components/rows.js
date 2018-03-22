import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, ViewPropTypes, Text, StyleSheet } from 'react-native';
import Cell from './cell';

class Row extends Component {
  static propTypes = {
    widthArr: PropTypes.array,
    flexArr: PropTypes.array,
    data: PropTypes.array,
    dataValues: PropTypes.object,
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
  }

  _onPress(data){
    this.props.onPress(data)
  }

  render() {
    const {data, dataValues, style, widthArr, height, flexArr, textStyle, borderStyle} = this.props;
    let widthNum = 0;
    if (widthArr) {
      for(let i=0; i<widthArr.length; i++) {
          widthNum += widthArr[i];
      }
    }

    return (
      data ?
      <TouchableOpacity activeOpacity={this.props.activeOpacity || 1} onPress={() => this._onPress(dataValues)}>
      <View style={[
        height && {height: height},
        widthNum && {width: widthNum},
        styles.row,
        style
      ]}>
        {
          data.map((item, i) => {
            const flex = flexArr && flexArr[i];
            const width = widthArr && widthArr[i];
            return <Cell key={i} data={item} width={width} height={height} flex={flex} textStyle={textStyle} borderStyle={borderStyle}/>
          })
        }
      </View></TouchableOpacity>
      : null
    )
  }
}

class Rows extends Component {
  static propTypes = {
    widthArr: PropTypes.array,
    flexArr: PropTypes.array,
    data: PropTypes.array,
    action: PropTypes.object,
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
  }

  _onPress(data){
    this.props.action(data)
  }

  render() {
    const {data, style, widthArr, heightArr, flexArr, textStyle, borderStyle} = this.props;
    let flexNum = 0, widthNum = 0;
    if (flexArr) {
      for(let i=0; i<flexArr.length; i++) {
          flexNum += flexArr[i];
      }
    }
    if (widthArr) {
      for(let i=0; i<widthArr.length; i++) {
          widthNum += widthArr[i];
      }
    }

    return (
      data ?
      <View style={[
        flexNum && {flex: flexNum},
        widthNum && {width: widthNum},
      ]}>
        {
          data.map((item, i) => {
            const height = heightArr && heightArr[i];
            return <Row activeOpacity={this.props.activeOpacity || 1} dataValues={data.data} onPress={(e) => this._onPress(e)} key={i} data={item.row} widthArr={widthArr} height={height} flexArr={flexArr} style={style} textStyle={textStyle} borderStyle={borderStyle}/>
          })
        }
      </View>
      : null
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden'
  },
})

export { Row, Rows };
