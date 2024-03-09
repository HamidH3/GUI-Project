import React from 'react';
import PropTypes from 'prop-types';


const BottomSection = () => {
    return (
      <div className="bottomSec">
        {/* Should include vertical scroller with extra info */}
        <div className="title">
            <p>bottom</p>
        </div>
        <div className="bottom-scroll">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            at eligendi velit odio eveniet harum deleniti doloremque similique,
            autem libero, vero dolorem! Eum dignissimos cum quo rerum, sint vel
            deleniti.
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi 
            placeat voluptatem distinctio a, officiis, repudiandae reprehenderit 
            perspiciatis vitae dolorem quod suscipit, asperiores ipsum voluptas
             quidem amet molestias deserunt sed similique.</p>
        </div>
      </div>
    );
};




export default BottomSection;
