import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import theme from 'root/theme';
import {addComment} from 'root/app/redux-core/actions/comment';
import {openSnack} from 'root/app/redux-core/actions/snackInfo';

import {Step, StepContent, StepLabel, Stepper} from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

const Wrap = styled(Paper)`
  padding: 5px;
`;
const Title = styled.h2`
  text-align: center;
  color: #2793e8 !important;
`;
const InputTitle = styled.h3`
  color: ${theme.palette.primary1Color}
`;

@connect(store => ({
  comments: store.comments,
}))

class NewComment extends React.Component {
  dispatch = this.props.dispatch;

  state = {
    finished: false,
    stepIndex: 0,
    comment: {
      name: null,
      comment: null,
    },
  };

  handleNext = () => {
    const {stepIndex, comment: {comment: body, name: author}} = this.state;
    const failed = prop =>
        ({
          ...this.state.comment,
          [prop]: false,
        });

    stepIndex < 1 && this.setState({stepIndex: stepIndex + 1});

    switch (stepIndex) {
      case 0:
        !author && this.setState({comment: failed('name')});
        break;
      case 1:
        !body && this.setState({comment: failed('comment')});

        if (author && body) {
          const {parentId} = this.props;

          this.setState({
            finished: true,
            stepIndex: stepIndex + 1,
          });
          this.dispatch(addComment({author, body, parentId}));
          this.dispatch(openSnack(`Successfully Added`));

        } else {
          this.dispatch(openSnack(`Require Name Author and Comment`));
        }
        break;
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    stepIndex > 0 && this.setState({stepIndex: stepIndex - 1});
  };

  handleInput = e => {
    const input = e.target;

    this.setState({
      comment: {
        ...this.state.comment,
        [input.labels[0].textContent]: input.value.trim(),
      },
    });
  };

  handleReset = e => {
    e.preventDefault();

    this.setState({
      stepIndex: 0,
      finished: false,
      comment: {
        name: null,
        comment: null,
      },
    });
  };

  renderStepActions = step => {
    const {stepIndex} = this.state;

    return (
        <div style={{margin: '12px 0'}}>
          <RaisedButton
              label={stepIndex === 1 ? 'ADD' : 'Next'}
              disableTouchRipple={true}
              disableFocusRipple={true}
              primary={true}
              onClick={this.handleNext}
              style={{marginRight: 12}}
          />
          {step > 0 && (
              <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  onClick={this.handlePrev}
              />
          )}
        </div>
    );
  };

  renderTextField = (prop, option) =>
      <TextField
          onChange={this.handleInput}
          hintText={`Your ${prop}...`}
          floatingLabelText={prop}
          multiLine={option}
          fullWidth={option}
      />;

  render() {
    const {finished, stepIndex, comment: {name, comment}} = this.state;

    const stepLabel = (title, titleDefault) => {
      const checkLength = () =>
          title.length > 100
              ? <InputTitle>{`${title.slice(0, 100)}...`}</InputTitle>
              : <InputTitle>{title}</InputTitle>;

      return (
          <StepLabel>
            {title ? checkLength() : titleDefault}
          </StepLabel>
      );
    };

    const warningLabel = () =>
        <StepLabel icon={<WarningIcon color={'#F44336'}/>}
                   style={{color: '#F44336'}}>
          This field is required.
        </StepLabel>;

    return (
        <Wrap zDepth={5}>
          <Title>Your comments are always welcome</Title>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step completed={!!name}>
              {name === false
                  ? warningLabel()
                  : stepLabel(name, 'Author')
              }
              <StepContent>
                {this.renderTextField('name', false)}
                {this.renderStepActions(0)}
              </StepContent>
            </Step>

            <Step completed={!!comment}>
              {comment === false
                  ? warningLabel()
                  : stepLabel(comment, 'New Comment')
              }
              <StepContent>
                {this.renderTextField('comment', true)}
                {this.renderStepActions(1)}
              </StepContent>
            </Step>

          </Stepper>

          {finished &&
          <section>
            <h3>Thank You !</h3>
            <FlatButton onClick={this.handleReset}
                        label="NEW Comment"
                        secondary={true}/>
          </section>
          }
        </Wrap>
    );
  }
}

export default NewComment;