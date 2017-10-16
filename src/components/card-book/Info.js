import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const style = {
  height: 270,
  width: 200,
  margin: 10,
  cursor: 'pointer',
};

class Info extends React.Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
    };
    this.book = props.bookObj;
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
          label="Close"
          primary={true}
          onClick={this.handleClose}
      />,
    ];

    return (
        <div>
          <img onClick={this.handleOpen}
               style={style}
               src={this.book.imageLinks.thumbnail}
               alt={this.book.title}/>
          <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
          >

            <h3>{this.book.title}</h3>
            <span>Published Date: {this.book.publishedDate}</span>
            <p>{this.book.description}</p>
            <a href={this.book.infoLink} target="_blank">More info...</a>
          </Dialog>
        </div>
    );
  }
}

Info.propTypes = {
  bookObj: PropTypes.object,
};

export default Info;