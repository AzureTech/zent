import React, { Component } from 'react';
import Input from 'zent-input';
import isNaN from 'zent-utils/lodash/isNaN';

export default class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  static defaultProps = {
    min: -Infinity,
    max: Infinity,
    step: 1
  };

  componentWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  }

  onchange = (e) => {
    const { onChange, max, min, step } = this.props;
    let newValue = e.target.value;
    this.setState({ value: newValue });
    newValue = Number(newValue);
    if (!isNaN(newValue)) {
      newValue = Math.round(newValue / step) * step;
      onChange && newValue >= min && newValue <= max && onChange(newValue);
    }
  }

  handleBlur = (e) => {
    let newValue = e.target.value;
    const { onChange, max, min } = this.props;
    if (newValue > max) {
      newValue = max;
    } else if (newValue < min) {
      newValue = min;
    }
    this.setState({ value: newValue });
    onChange(newValue);
  }

  render() {
    const { value } = this.state;
    return (<Input onBlur={this.handleBlur} onChange={this.onchange} value={value} />);
  }
}
