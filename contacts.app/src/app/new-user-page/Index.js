import React from 'react';
import styled from 'styled-components';

import Paper from 'material-ui/Paper';
import Header from './components/Header';
import NewContact from './scenes/NewContact';

const Main = styled(Paper)`
  max-width: 400px;
  margin: 10% auto 0;
`;

const NewUserPage = () =>
    <div>
      <Header/>
      <Main zDepth={5}>
        <NewContact/>
      </Main>
    </div>;

export default NewUserPage;