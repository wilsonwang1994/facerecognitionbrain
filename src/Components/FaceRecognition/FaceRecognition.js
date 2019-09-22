import React from 'react';

const FaceRecognition = ({ imgUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img alt='' src={imgUrl} width='500px' heigh='auto' />
            </div>
        </div>
    );
}

export default FaceRecognition;
