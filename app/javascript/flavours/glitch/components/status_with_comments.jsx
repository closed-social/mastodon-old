import React from 'react';
import { connect } from 'react-redux';
import ImmutablePureComponent from 'react-immutable-pure-component';
import StatusContainer from 'flavours/glitch/containers/status_container';
import LoadMore from 'flavours/glitch/components/load_more';

const mapStateToProps = (state, { id }) => {
  let status = state.getIn(['statuses', id]);
  let reblogId = status.get('reblog'); // reblog here is a id

  return {
    childrenIds: state.getIn(['contexts', 'replies', reblogId || id]),
    quotedId: reblogId && state.getIn(['statuses', reblogId, 'in_reply_to_id']),
  };
};


export default @connect(mapStateToProps)
class StatusWithComments extends ImmutablePureComponent {

  state = {
    showAll: false,
  };

  show = () => this.setState({ showAll: true });

  render() {
    const { id, childrenIds, quotedId, ...other } = this.props;
    const { showAll } = this.state;
    let hideSome = !showAll && !!childrenIds && childrenIds.size > 3;
    return (
      <div className='status-with-comments'>
        {quotedId ? (
          <div className='status__quoted-status'>
            <StatusContainer
              id={quotedId}
            />
          </div>
        ) : null}
        <StatusContainer
          id={id}
          {...other}
        />
        {childrenIds ? (
          <div className='status__comments'>
            {childrenIds
              .filter((_, idx) => showAll || idx < 3)
              .map(cid => (
                <StatusContainer
                  key={`comment-${cid}`}
                  id={cid}
                  collapse={hideSome}
                />
              ))}
            {hideSome ? (
              <LoadMore
                visible={hideSome}
                onClick={this.show}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }

}
