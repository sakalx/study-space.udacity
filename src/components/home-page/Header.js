import React from 'react';

import Paper from 'material-ui/Paper';

const style = {
  width: '95vw',
  textAlign: 'center',
  display: 'inline-block',
  background: '#2793e8',
  color: '#303030',
};

const Header = props =>
    <section style={{textAlign: 'center'}}>
      <Paper style={style} zDepth={5}>
        <h1>MyReads</h1>
      </Paper>
    </section>;

Header.propTypes = {};

export default Header;