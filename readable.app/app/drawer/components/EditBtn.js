import React from 'react';
import PropTypes from 'prop-types';
import muiTheme from 'root/theme';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionEdit from 'material-ui/svg-icons/editor/border-color';
import ContentCreate from 'material-ui/svg-icons/content/create';

const EditBtn = props => {
  const {disabled, editCategory, editMode} = props;

  return (
      <FloatingActionButton mini={true}
                            disabled={disabled}
                            backgroundColor={editMode
                                ? muiTheme.palette.primary1Color
                                : '#fff'}
                            onClick={() => editCategory()}
      >
        {editMode
            ? <ContentCreate/>
            : <ActionEdit/>
        }
      </FloatingActionButton>
  );
};

EditBtn.propTypes = {
  disabled: PropTypes.bool,
  editMode: PropTypes.bool,
  editCategory: PropTypes.func,
};

export default EditBtn;