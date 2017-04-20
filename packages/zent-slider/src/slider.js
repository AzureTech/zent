import React, { Component } from 'react';
import Range from './range';
import InputField from './inputField';

export default class Slider extends Component {
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    withInput: true,
    range: false,
    value: 0,
    defaultValue: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.range ? props.value.sort((a, b) => a - b) : props.value
    };
  }

  onChange = (value) => {
    const { range, onChange } = this.props;
    value = range ? value.sort((a, b) => a - b).map(v => Number(v)) : value;
    this.setState({ value });
    onChange && onChange(value);
  }

  render() {
    const { withInput, ...restProps } = this.props;
    const { value } = this.state;
    return (<div className="zent-slider">
      <Range {...restProps} value={value} onChange={this.onChange} />
      {withInput && !restProps.dots && <InputField onChange={this.onChange} {...restProps} value={value} />}
    </div>);
  }
}
