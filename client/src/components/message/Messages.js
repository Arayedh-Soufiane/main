import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../TaskBarterLogo_Transparent.png';
import PropTypes from 'prop-types';
import { userPersonalDetails } from '../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../style/messages.css';
import { Input } from 'reactstrap';
import UserList from './subs/UserList';
import ChatHeader from './subs/ChatHeader';
import ChatTextArea from './subs/ChatTextArea';
import ChatMessages from './subs/ChatMessages';

const users = [
  {
    name: 'Mohsin Hayat',
    username: 'mohsin',
    msg_time: Date.now(),
    last_msg: 'Hello yr kaisay ho? kafi din hogye milay nai kya hua'
  },

  {
    name: 'Daniyal Ikhlaq',
    username: 'daniyal',
    msg_time: Date.now(),
    last_msg: 'hello brother how are y...'
  }
];

const userObj = {
  first_name: 'Mohsin',
  second_name: 'Hayat',
  location: 'Lahore, Pakistan',
  memberSince: Date.now(),
  username: 'mohsin'
};

const messages = [
  {
    text: 'kaisa hai bro?',
    time: Date.now(),
    from: '123412'
  },
  {
    text: 'Theek bro. Tu kaisa hai?',
    time: Date.now(),
    from: '123123'
  },
  {
    text:
      'Main bhi theek. Kaam krday yr. 10 01 10 101 01 01 01 01 010 01 01 010 0 101 001 01010010101001101  101 10 101 01 1 0',
    time: Date.now(),
    from: '123412'
  },
  {
    text: 'Okay main krta hun.',
    time: Date.now(),
    from: '123123'
  },
  {
    text: 'bas 10 minute day.',
    time: Date.now(),
    from: '123123'
  }
];

class Messages extends Component {
  render() {
    return (
      <div className='msg-container messages'>
        <div className='conversations left-pane'>
          <div className='action-box'>
            <div className='search-container'>
              <Input
                type='search'
                name='search'
                id='exampleSearch'
                placeholder='search conversations'
                className='task-search-box'
              />
            </div>
          </div>
          <div className='task-list-title left-pane-title'>
            Your Recent Conversations
          </div>

          <div className='userlist-container'>
            <UserList users={users} />
          </div>
        </div>
        <div className='chat-box'>
          <ChatHeader user={userObj} />
          <ChatMessages msgs={messages} />
          <ChatTextArea />
        </div>
      </div>
    );
  }
}

export default Messages;
