import React from 'react';
import styled from 'styled-components';
import {create} from 'root/api/LocalStorage';
import * as UploadImg from 'root/api/UploadImg';
import theme from 'root/theme';

import WarningIcon from 'material-ui/svg-icons/alert/warning';
import {Step, StepContent, StepLabel, Stepper} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import AvatarIcon from 'material-ui/svg-icons/action/account-box';
import TextField from 'material-ui/TextField';
import InputImg from '../components/InputImg';
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
      name: null,
      email: null,
    },
    messageBar: '',
  };

  handleNext = () => {
    const {stepIndex, contact} = this.state;
    const failed = prop => ({...contact, [prop]: false});

    stepIndex < 2 && this.setState({stepIndex: stepIndex + 1});

    switch (stepIndex) {
      case 0:
        this.setState({contact: {...contact, showAvatar: true}});
        break;
      case 1:
        !contact.name && this.setState({contact: failed('name')});
        break;
      case 2:
        !contact.email && this.setState({contact: failed('email')});
        if (contact.name && contact.email) {
          create(this.state.contact);
          this.setState({
            finished: true,
            stepIndex: stepIndex + 1,
            messageBar: `${contact.name} Successfully Added`,
          });
        } else {
          this.setState({messageBar: `Require Name and Email`,});
        }
        break;
    }
  };

  handlePrev = () => {
    const {stepIndex, contact} = this.state;

    stepIndex > 0 && this.setState({messageBar: '', stepIndex: stepIndex - 1});
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
        [input.labels[0].textContent]: input.value.trim(),
      },
    });
  };

  handleReset = e => {
    e.preventDefault();

    this.setState({
      stepIndex: 0, finished: false,
      messageBar: '',
      contact: {
        showAvatar: false,
        img: '',
        name: null,
        email: null,
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
        fullWidth={true}
    />;
  }

  render() {
    const {finished, stepIndex, contact, messageBar} = this.state;

    const stepLabel = (title, titleDefault) =>
        <StepLabel>
          {title ? <InputTitle>{title}</InputTitle> : titleDefault}
        </StepLabel>;

    const warningLabel = () =>
        <StepLabel icon={<WarningIcon color={'#cc181e'}/>}
                   style={{color: '#cc181e'}}>
          Empty Field
        </StepLabel>;

    return (
        <Wrap>
          <Stepper activeStep={stepIndex} orientation="vertical">

            <Step>
              <StepLabel >
                {contact.showAvatar
                    ? <Avatar size={64} src={contact.img} icon={<AvatarIcon/>}/>
                    : 'Upload Avatar'
                }
              </StepLabel>
              <StepContent>
                <InputImg loadImg={this.handleLoadImg}/>
                <Avatar size={150} src={contact.img} icon={<AvatarIcon/>}/>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>

            <Step completed={!!contact.name}>
              {contact.name === false
                  ? warningLabel()
                  : stepLabel(contact.name, 'Add Name')
              }
              <StepContent>
                {this.renderTextField('name')}
                {this.renderStepActions(1)}
              </StepContent>
            </Step>

            <Step completed={!!contact.email}>
              {contact.email === false
                  ? warningLabel()
                  : stepLabel(contact.email, 'Add Email')
              }
              <StepContent>
                {this.renderTextField('email')}
                {this.renderStepActions(2)}
              </StepContent>
            </Step>

          </Stepper>
          {finished &&
              <section>
                <h3>Done !</h3>
                <FlatButton onClick={this.handleReset} label="NEW" secondary={true}/>
              </section>
          }
          <SnackBar message={messageBar} open={!!messageBar}/>
        </Wrap>
    );
  }
}

export default NewContact;