import React from 'react';
import { connect } from 'react-redux';
import ImmutablePureComponent from 'react-immutable-pure-component';
import StatusContainer from 'flavours/glitch/containers/status_container';
import LoadMore from 'flavours/glitch/components/load_more';

const mapStateToProps = (state, { id }) => {
  let status = state.getIn(['statuses', id]);
  let reblogId = status.get('reblog'); // reblog here is a id

  return {
    childrenWithGrandchildren: state.getIn(['contexts', 'replies', reblogId || id], []).map((cid) => ({
      cid,
      grandchildrenIds: state.getIn(['contexts', 'replies', cid], []),
    })),
    quotedId: reblogId && state.getIn(['statuses', reblogId, 'in_reply_to_id']),
  };
};

const N = 3;

export default @connect(mapStateToProps)
class StatusWithComments extends ImmutablePureComponent {

  state = {
    showAll: false,
  };

  show = () => this.setState({ showAll: true });

  render() {
    const { id, childrenWithGrandchildren, quotedId, ...other } = this.props;
    const { showAll } = this.state;
    const loadMore = (
      <LoadMore
        visible
        onClick={this.show}
      />
    );
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
        {childrenWithGrandchildren.size > 0 && (
          <div className='status__comments'>
            {childrenWithGrandchildren
              .filter((_, idx) => showAll || idx < N)
              .map(({ cid,  grandchildrenIds }) => (
                <>
                  <StatusContainer
                    key={`comment-${cid}`}
                    id={cid}
                  />
                  {grandchildrenIds.size > 0 && (
                    <div className='subcomments'>
                      {grandchildrenIds
                        .filter((_, idx) => showAll || idx < N)
                        .map((gid) => (
                          <StatusContainer
                            key={`subcomment-${gid}`}
                            id={gid}
                          />
                        ))}
                      {!showAll && grandchildrenIds.size > N && loadMore}
                    </div>
                  )}
                </>
              ))}
            {!showAll && childrenWithGrandchildren.size > N && loadMore}
          </div>
        ) }
      </div>
    );
  }

}
