import React from 'react';
import PropTypes from 'prop-types';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionEdit from 'material-ui/svg-icons/editor/border-color';

const EditBtn = props => {
  const {disabled, editCategory} = props;

  return (
      <FloatingActionButton mini={true}
                            disabled={disabled}
                            backgroundColor="#fff"
                            onClick={() => editCategory()}
      >
        <ActionEdit/>
      </FloatingActionButton>
  );
};

EditBtn.propTypes = {
  disabled: PropTypes.bool,
  editCategory: PropTypes.func,
};

export default EditBtn;