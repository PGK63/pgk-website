import React from 'react';
import {Player} from "@lottiefiles/react-lottie-player";

const EmptyListUi = () => {
    return (
        <div>
            <h1 style={{textAlign:"center"}}>Ничего не найдено </h1>
            <Player
                autoplay={true}

                src="https://assets10.lottiefiles.com/packages/lf20_ydo1amjm.json"
                style={{ height: '700px', width: '700px'}}/>
        </div>
    );
};

export default EmptyListUi;