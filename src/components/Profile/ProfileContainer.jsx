import React from 'react';
import Profile from './Profile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserProfile, getUserStatus, updateUserStatus} from '../../Redux/profile-reducer';
import {withAuthRedirect} from '../hoc/withAuthRedirect';
import {compose} from 'redux';


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId || 22407;
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return <Profile {...this.props} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

// конвейер обработчиков
export default compose(
    connect(mapStateToProps,{getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);