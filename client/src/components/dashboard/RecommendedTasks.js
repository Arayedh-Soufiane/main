import React, { useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetch_workplace_tasks } from '../../actions/taskAction';
import { dateEpx } from '../../actions/taskAction';
import { toggleLike, sendProposal } from '../../actions/taskAction';
import TaskCard from '../explore/subs/TaskCard';
import TaskDetails from '../explore/subs/TaskDetails';
import ShareTasksPopup from '../explore/subs/ShareTasksPopup';
import ProposalForm from '../explore/subs/ProposalForm';
import TaskCardSkeleton from '../task/subs/TaskCardSkeleton';

class RecommendedTasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detail_popup_is_open: false,
      selected_task: 0,
      workplaceTasks: [],
      proposal_popup_is_open: false,
      proposal_text: '',
      proposal_loading: false,
      share_popup_is_open: false,
      task_payload: {
        task_url: '',
        task_headline: '',
        from: '',
      },
    };
  }

  fetchFilters = () => {
    const explored_filters = {
      c: 0,
      z: 2,
      s: '',
      r: '',
      k: '',
      l: '',
      i: '',
    };
    return explored_filters;
  };

  componentDidMount() {
    this.props
      .fetch_workplace_tasks()
      .then(() => {
        this.setState({
          workplaceTasks: this.props.tasks,
        });
      })
      .then(() => {
        //this.props.doExplore({}, false);
      });
  }
  onTaskSelect = (task_id) => {
    this.setState({ selected_task: task_id }, () => {
      this.task_detail_toggle();
    });
  };

  task_detail_toggle = () => {
    this.setState({
      detail_popup_is_open: !this.state.detail_popup_is_open,
    });
  };

  changeProposalText = (t) => {
    if (t) {
      this.setState({
        proposal_text: t.target.value,
      });
    } else {
      this.setState({
        proposal_text: '',
      });
    }
  };
  share_toggle = () => {
    this.setState({
      share_popup_is_open: !this.state.share_popup_is_open,
    });
  };
  onTaskShare = (payload = {}) => {
    console.log(payload);
    this.setState(
      {
        task_payload: payload,
      },
      () => {
        this.share_toggle();
      }
    );
  };

  sendProposal = () => {
    const payload = {
      text: this.state.proposal_text,
      task_id: this.state.selected_task,
    };
    this.setState(
      {
        proposal_loading: true,
      },
      () => {
        this.props.sendProposal(payload).then(() => {
          this.setState({
            proposal_popup_is_open: false,
            proposal_text: '',
            proposal_loading: false,
          });
        });
      }
    );
  };
  proposal_toggle = () => {
    this.setState({
      proposal_popup_is_open: !this.state.proposal_popup_is_open,
    });
  };
  render() {
    if (!this.state.workplaceTasks[0]) {
      return (
        <div className='card card-body'>
          <div className='tasks-heading'>Recently Added Tasks</div>
          <div className='task-list-container task-list-dashboard'>
            <TaskCardSkeleton />
            <TaskCardSkeleton />
          </div>
        </div>
      );
    }

    return (
      <div className='card card-body'>
        <div className='tasks-heading'>Recently Added Tasks</div>
        <div className='task-list-container task-list-dashboard'>
          {this.state.workplaceTasks.map((task, i) => (
            <TaskCard
              task={task}
              key={i}
              onClick={this.onTaskSelect}
              onTaskShare={this.onTaskShare}
              pending_proposals={this.props.pending_proposals}
            />
          ))}
        </div>
        <Link to='/explore'>
          <button className='mt-3 btn redeem-btn'>Explore More Work</button>
        </Link>
        <TaskDetails
          toggle={this.task_detail_toggle}
          modal={this.state.detail_popup_is_open}
          selected_task={this.state.selected_task}
          proposal_toggle={this.proposal_toggle}
          current_user={this.props.auth.user.id}
          onTaskShare={this.onTaskShare}
          pending_proposals={this.props.pending_proposals}
        />
        <ProposalForm
          toggle={this.proposal_toggle}
          modal={this.state.proposal_popup_is_open}
          selected_task={this.state.selected_task}
          proposal_text={this.state.proposal_text}
          changeProposalText={this.changeProposalText}
          sendProposal={this.sendProposal}
          proposalLoading={this.state.proposal_loading}
        />
        <ShareTasksPopup
          toggle={this.share_toggle}
          modal={this.state.share_popup_is_open}
          task={this.state.task_payload}
        />{' '}
      </div>
    );
  }
}

RecommendedTasks.propTypes = {
  auth: PropTypes.object.isRequired,
  fetch_workplace_tasks: PropTypes.func.isRequired,
  toggleLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.task.workplace_tasks,
  auth: state.auth,
  pending_proposals: state.task.pending_proposals,
});

export default connect(mapStateToProps, {
  fetch_workplace_tasks,
  toggleLike,
  sendProposal,
})(RecommendedTasks);
