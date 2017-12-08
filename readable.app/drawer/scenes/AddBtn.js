import React from 'react';
import PropTypes from 'prop-types';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentCreate from 'material-ui/svg-icons/content/create';

const AddBtn = props => {
  const {disabled, addCategory, open} = props;

  return (
      <FloatingActionButton mini={true}
                            disabled={disabled}
                            onClick={() => addCategory()}
      >
        {open
            ? <ContentCreate/>
            : <ContentAdd/>
        }
      </FloatingActionButton>
  );
};

AddBtn.propTypes = {
  disabled: PropTypes.bool,
  addCategory: PropTypes.func,
  open: PropTypes.bool,
};

export default AddBtn;