import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Img = styled.img`
  height: 270px;
  width: 200px;
  margin: 10px;
  cursor: pointer;
`;

class Info extends React.Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
    };
  }

  handleOpen = () => this.setState({open: true});

  handleClose = () => this.setState({open: false});

  render() {
    const actions = [
      <FlatButton
          label="Close"
          primary={true}
          onClick={this.handleClose}/>,
    ];

    return (
        <div>
          <Img onClick={this.handleOpen}
               src={this.props.bookObj.imageLinks.thumbnail}
               alt={this.props.bookObj.title}/>

          <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}>

            <h3>{this.props.bookObj.title}</h3>
            <span>Published Date: {this.props.bookObj.publishedDate}</span>
            <p>{this.props.bookObj.description}</p>
            <a href={this.props.bookObj.infoLink} target="_blank">More info...</a>
          </Dialog>

        </div>
    );
  }
}

Info.propTypes = {
  bookObj: PropTypes.object,
};

export default Info;