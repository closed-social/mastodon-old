import { connect } from 'react-redux';
import Status from '../components/status2';
import { makeGetStatus } from '../selectors';
import {
  replyCompose,
  mentionCompose,
  directCompose,
} from '../actions/compose';
import {
  reblog,
  favourite,
  unreblog,
  unfavourite,
  pin,
  unpin,
} from '../actions/interactions';
import {
  muteStatus,
  unmuteStatus,
  deleteStatus,
  hideStatus,
  revealStatus,
} from '../actions/statuses';
import { initMuteModal } from '../actions/mutes';
import { initBlockModal } from '../actions/blocks';
import { initReport } from '../actions/reports';
import { openModal } from '../actions/modal';
import { defineMessages, injectIntl } from 'react-intl';
import { boostModal, deleteModal } from '../initial_state';
import { showAlertForError } from '../actions/alerts';

const makeMapStateToProps = () => {
  const getStatus = makeGetStatus();

  const mapStateToProps = (state, props) => ({
    status: getStatus(state, props),
    sonsIds: state.getIn(['contexts', 'replies', props.id]),
  });

  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, { intl }) => ({
});

export default injectIntl(connect(makeMapStateToProps, mapDispatchToProps)(Status));
