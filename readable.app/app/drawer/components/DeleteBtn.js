import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';

const Counter = styled.span`
  position: absolute;
`;

const DeleteBtn = props => {
  const {disabled, deleteCategories, deleteCount} = props;

  return (
      <div>
        <FloatingActionButton mini={true}
                              secondary={true}
                              disabled={disabled}
                              onClick={() => deleteCategories()}
        >
          <ActionDelete/>
        </FloatingActionButton>
        {deleteCount > 0 && <Counter>{deleteCount}</Counter>}
      </div>
  );
};

DeleteBtn.propTypes = {
  disabled: PropTypes.bool,
  deleteCategories: PropTypes.func,
  deleteCount: PropTypes.number,
};

export default DeleteBtn;