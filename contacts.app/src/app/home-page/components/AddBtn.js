import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const Button = styled(FloatingActionButton)`
  position: fixed;
  top: 25px;
  right: 25px;
`;

const BtnAdd = props =>
    <Link to='/newContact'>
      <Button mini={true} secondary={true}>
        <ContentAdd/>
      </Button>
    </Link>;

export default BtnAdd;
