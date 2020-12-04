import { Component } from "react";
import Joi from "joi-browser";

export class Form extends Component {
  state = {
    data: {},
    errors: {},
    rememberMe: false,
  };
  componentDidMount() {}
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleSubmit = () => {
    const errors = this.validate();
    const data = this.state.data;
    // const rememberMeStatus = this.state.rememberMe

    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit(data);
  };
  handleRemeberMe = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        keepSignedIn: !this.state.data.keepSignedIn,
      },
    });
  };
  handleChange = (event) => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value,
      },
    });
  };
}

export default Form;
