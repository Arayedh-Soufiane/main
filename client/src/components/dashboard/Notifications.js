import React from 'react';
import '../../style/notifications.css';
import NotificationItem from '../notifications/subs/NotificationItem';
import slice from 'lodash/slice';
import TLoader from '../utils/TLoader';

const Notifications = (props) => {
  const onViewAllBtn = () => {
    props.history.push('/notifications');
  };
  if (!props.notifs || props.notifs.length < 1) {
    return (
      <div className='card card-body mb-2'>
        <div className='notification-heading'>
          Your Notifications
          <button onClick={onViewAllBtn} className='btn notification-btn fl-r'>
            View All
          </button>
        </div>
        <div className='taskv-loader' style={{ height: '20vh' }}>
          <TLoader colored={true} />
        </div>
      </div>
    );
  }
  let sliced_notifs = slice(props.notifs, 0, 3);

  return (
    <div className='card card-body mb-2'>
      <div className='notification-heading'>
        Your Notifications
        <button onClick={onViewAllBtn} className='btn notification-btn fl-r'>
          View All
        </button>
      </div>
      <div className='notif-list'>
        {sliced_notifs.map((notif, key) => {
          return <NotificationItem notif={notif} key={key} />;
        })}
      </div>
    </div>
  );
};

export default Notifications;
