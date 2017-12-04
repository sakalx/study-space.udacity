import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {addPost, editPost, getPostById} from 'root/app/redux-core/actions/post';
import {openSnack} from 'root/app/redux-core/actions/snackInfo';

import Header from '../header/Header';
import LinkToHome from '../link-to-home/LinkToHome';
import TextField from 'material-ui/TextField';
import SelectCategory from './scenes/SelectCategory';
import BtnSubmit from './components/BtnSubmit';
import SnackInfo from '../snack-info/SnackInfo';

const BackToHome = styled.div`
  position: absolute;
  top: 0px;
`;
const Author = styled.div`
  display: flex;
  justify-content: flex-end;
`;

@connect(store => ({
  posts: store.posts,
}))

class UpdatePost extends React.Component {
  dispatch = this.props.dispatch;
  editPostId = this.props.match.params.id;

  state = {
    category: '',
    title: '',
    post: '',
    name: '',
  };

  componentDidMount = () => {
    if (this.editPostId) {
      const setPost = () => {
        const editedPost = this.props.posts[this.editPostId];
        const {category, title, body: post, author: name} = editedPost;
        this.setState({category, title, post, name});
      };

      this.dispatch(getPostById(this.editPostId));
      setTimeout(setPost, 0);
    }
  };

  handleSelectedCategory = category => this.setState({category});

  handleInput = ({target}, value) => {
    const key = target.labels[0].innerText.toLocaleLowerCase();
    this.setState({[key]: value});
  };

  handleSubmit = () => {
    const {category, title, post, name} = this.state;
    const postDataKey = Object.keys(this.state);

    const validatePost = postDataKey.every(key => this.state[key]);

    if (validatePost) {
      this.editPostId
          ? this.dispatch(
          editPost(this.editPostId, {category, title, body: post, author: name}),
      )
          : this.dispatch(
          addPost({category, title, body: post, author: name}),
      );

      this.dispatch(openSnack(`Thank You ${name}, All Done!`));
    } else {
      this.dispatch(openSnack('Fill in All Required Fields'));

      postDataKey.forEach(key =>
          !this.state[key] &&
          this.setState({[key]: false}),
      );
    }
  };

  renderTextField = ({prop, value, option = true}) => {
    const requiredField = (this.state[prop] === false)
        ? 'This field is required.'
        : '';

    return (
        <TextField
            value={value ? value : ''}
            onChange={this.handleInput}
            errorText={requiredField}
            hintText={`Type your ${prop}...`}
            floatingLabelText={prop.toUpperCase()}
            multiLine={option}
            fullWidth={option}
            rows={option ? Math.ceil(value.length / 100) + 1 : 1}
        />
    );
  };

  render() {
    const {category, title, post, name} = this.state;
    const header = this.editPostId
        ? 'Edit Post'
        : 'Create new Awesome Post';

    return (
        <div>
          <Header title={header}/>
          <BackToHome>
            <LinkToHome/>
          </BackToHome>
          <SelectCategory handleSelect={this.handleSelectedCategory}
                          requiredField={category === false}
                          currentCategory={category ? category : ''}
          />
          {this.renderTextField({prop: 'title', value: title})}
          {this.renderTextField({prop: 'post', value: post})}
          <Author>
            {this.renderTextField({prop: 'name', value: name, option: false})}
          </Author>
          <BtnSubmit submit={this.handleSubmit}/>
          <SnackInfo/>
        </div>
    );
  }
}

export default UpdatePost;