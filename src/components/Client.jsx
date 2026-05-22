import React from 'react';
import Avatar from 'react-avatar';

const Client = ({ user }) => {

    return (

        <div className='client'>

            <Avatar
                name={user?.toUpperCase() || 'U'}
                size="52"
                round="14px"
                textSizeRatio={2}
                color="#4aed88"
                fgColor="#0f172a"
            />

            <span className='userName'>
                {user}
            </span>

        </div>
    );
};

export default Client;