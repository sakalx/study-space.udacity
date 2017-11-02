import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Img = styled.img`
  height: 270px;
  width: 200px;z
  margin: 10px;
  cursor: pointer;
`;

class Info extends React.Component {

  state = {open: false};

  handleOpen = () => this.setState({open: true});

  handleClose = () => this.setState({open: false});

  render() {
    const {title, imageLinks, publishedDate, description, infoLink} = this.props.bookObj;

    const actions = [
      <FlatButton
          label="Close"
          primary={true}
          onClick={this.handleClose}/>,
    ];

    return (
        <div>
          <Img onClick={this.handleOpen}
               src={imageLinks.thumbnail}
               alt={title}
          />
          <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
          >
            <h3>{title}</h3>
            <span>Published Date: {publishedDate}</span>
            <p>{description}</p>
            <a href={infoLink} target="_blank">More info...</a>
          </Dialog>
        </div>
    );
  }
}

Info.propTypes = {
  bookObj: PropTypes.object,
};

export default Info;