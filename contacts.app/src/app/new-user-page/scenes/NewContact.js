import React from 'react';
import styled from 'styled-components';
import {create} from 'root/api/LocalStorage';
import * as UploadImg from 'root/api/UploadImg';
import theme from 'root/theme';

import {Step, StepContent, StepLabel, Stepper} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import AvatarIcon from 'material-ui/svg-icons/action/account-box';
import TextField from 'material-ui/TextField';
import InputImg from './InputImg';
import SnackBar from 'root/app/snack-bar/Index';

const Wrap = styled.div`
  max-width: 380px;
  max-height: 400px;
  margin: auto;
`;
const InputTitle = styled.h2`
  color: ${theme.palette.primary1Color}
`;

class NewContact extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
    contact: {
      showAvatar: false,
      img: '',
      name: '',
      email: '',
    },
    messageBar: '',
  };

  handleNext = () => {
    const {stepIndex, contact} = this.state;

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
    stepIndex === 0 && this.setState({
      contact: {...contact, showAvatar: true},
    });
    if (stepIndex >= 2) {
      create(this.state.contact);
      this.setState({messageBar: `${contact.name} Successfully Added`});
    }
  };

  handlePrev = () => {
    const {stepIndex, contact} = this.state;

    stepIndex > 0 && this.setState({stepIndex: stepIndex - 1});
    stepIndex === 1 && this.setState({
      contact: {...contact, showAvatar: false},
    });
  };

  handleLoadImg = e => {
    const {contact} = this.state;
    const file = e.target.files[0];

    UploadImg.validateSize(file).
        then(data => UploadImg.readImage(data)).
        then(data => this.setState({
          contact: {...contact, img: data,},
        }));
  };

  handleInput = e => {
    const input = e.target;

    this.setState({
      contact: {
        ...this.state.contact,
        [input.labels[0].textContent]: input.value,
      },
    });
  };

  handleReset = e => {
    e.preventDefault();

    this.setState({
      stepIndex: 0, finished: false,
      contact: {
        showAvatar: false,
        img: '',
        name: '',
        email: '',
      },
    });
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
        <div style={{margin: '12px 0'}}>
          <RaisedButton
              label={stepIndex === 2 ? 'ADD' : 'Next'}
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
  }

  renderTextField(text) {
    return <TextField
        onChange={this.handleInput}
        hintText={`Contact ${text}`}
        floatingLabelText={text}
        fullWidth={true}/>;
  }

  render() {
    const {finished, stepIndex, contact, messageBar} = this.state;

    return (
        <Wrap>
          <Stepper activeStep={stepIndex} orientation="vertical">

            <Step>
              <StepLabel >
                {contact.showAvatar
                    ? <Avatar size={64} src={contact.img} icon={<AvatarIcon/>}/>
                    : 'Upload Avatar'}
              </StepLabel>
              <StepContent>
                <InputImg loadImg={this.handleLoadImg}/>
                <Avatar size={150} src={contact.img} icon={<AvatarIcon/>}/>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>

            <Step>
              <StepLabel>
                {contact.name ? <InputTitle>{contact.name}</InputTitle> : 'Add Name'}
              </StepLabel>
              <StepContent>
                {this.renderTextField('name')}
                {this.renderStepActions(1)}
              </StepContent>
            </Step>

            <Step>
              <StepLabel>
                {contact.email ? <InputTitle>{contact.email}</InputTitle> : 'Add Email'}
              </StepLabel>
              <StepContent>
                {this.renderTextField('email')}
                {this.renderStepActions(2)}
              </StepContent>
            </Step>

          </Stepper>
          {finished && (
              <section>
                <h3>Done !</h3>
                <FlatButton onClick={this.handleReset} label="NEW" secondary={true}/>
              </section>
          )}
          <SnackBar message={messageBar} open={finished}/>
        </Wrap>
    );
  }
}

export default NewContact;