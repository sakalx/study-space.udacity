import React from 'react';
import styled from 'styled-components';

import Header from '../header/index';
import BtnCategories from './components/ButtonCategories';
import BtnAdd from './components/ButtonAdd';
import Post from '../card-post/Index';

const Btn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

class MainPage extends React.Component {
  render() {
    return (

        <div>
          <Header title='Readable'/>
          <Btn>
            <BtnCategories/>
          </Btn>
          <Post/>
          <BtnAdd/>
        </div>

    );
  }
}

export default MainPage;