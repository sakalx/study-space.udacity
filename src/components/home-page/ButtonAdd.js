import React from 'react';
import {Link} from 'react-router-dom';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  position: 'fixed',
  bottom: 25,
  right: 25,
};

const BtnAdd = props =>
    <Link to='/search'>
      <FloatingActionButton secondary={true} style={style}>
        <ContentAdd />
      </FloatingActionButton>
    </Link>;

export default BtnAdd;
