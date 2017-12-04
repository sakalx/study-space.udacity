import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const Button = styled(FloatingActionButton)`
  position: fixed;
  bottom: 25px;
  right: 25px;
`;

const BtnAdd = () => (
    <Link to='/update-post'>
      <Button>
        <ContentAdd/>
      </Button>
    </Link>
);

export default BtnAdd;