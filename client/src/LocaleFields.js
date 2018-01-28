import React, { Component } from 'react';
import './select.css';

class LocaleFields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldVal: "pt_br",
      fields: []
    }
  }

  update = (e) => {
    this.props.onUpdate(e.target.value);
    this.setState({fieldVal: e.target.value});
  };

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5a25fade2e0000213aa90776')
    .then(results => {
      return results.json();
    }).then(data => {
      return data['filters'][0]['values'];
    }).then(data => {
      let fields = data.map((field) => {
        return (
           <option value={field.value}>{field.name}</option>
        )
      })
      this.setState({fields: fields});
    })
  }

  render() {
    return (
      <div class="select__container">
        <h3>Locale</h3>
        <div class="select__wrapper">
          <select
              class="select__element"
              onChange={this.update}
              value={this.state.fieldVal}>
            {this.state.fields}
          </select>
        </div>
      </div>
    )
  }
}

export default LocaleFields;