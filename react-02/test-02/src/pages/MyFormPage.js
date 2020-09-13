import React, { Component } from "react";

function kFormCreate(Cmp) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.options = {}; //存储配置字段项
      this.state = {}; //存储字段值
    }
    handleChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    };
    getFieldDecorator = (field, option) => {
      this.options[field] = option;
      return InputCmp => (
        <div className="border">
          {React.cloneElement(InputCmp, {
            name: field,
            value: this.state[field] || "",
            onChange: this.handleChange,
          })}
        </div>
      );
    };
    getFieldsValue = () => {
      return { ...this.state };
    };
    getFieldValue = field => {
      return this.state[field];
    };
    validateFields = callback => {
      const tem = { ...this.state };
      const err = [];
      for (let i in this.options) {
          console.log(this.options)  
        if (tem[i] === undefined) {
          err.push({
            [i]: "error",
          });
        }
      }
      if (err.length > 0) {
        callback(err, tem);
      } else {
        callback(undefined, tem);
      }
    };

    render() {
      return (
        <div className="border">
          <Cmp
            {...this.props}
            getFieldDecorator={this.getFieldDecorator}
            getFieldsValue={this.getFieldsValue}
            getFieldValue={this.getFieldValue}
            validateFields={this.validateFields}
          />
        </div>
      );
    }
  };
}

const nameRule = {
  required: true,
  message: "please input your name",
};

const passwordRule = {
  required: true,
  message: "please input your password",
};
class MyFormPage extends Component {
  submit = () => {
    const { getFieldsValue, getFieldValue, validateFields } = this.props;
    validateFields((err, values) => {
        console.log(err)
      if (err) {
        console.log("err", err);
      } else {
        console.log("submit", values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props;
    return (
      <div>
        <h1>MyFormPage</h1>
        {getFieldDecorator("name", {
          rules: [nameRule],
        })(<input type="text" />)}
        {getFieldDecorator("password", { rules: [passwordRule] })(
          <input type="password" />,
        )}
        <button onClick={this.submit}>提交</button>
      </div>
    );
  }
}

export default kFormCreate(MyFormPage);
