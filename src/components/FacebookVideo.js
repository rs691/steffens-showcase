"use client";

import { useEffect } from 'react';



const FacebookVideo = ({ videoHref, width = 500, showText = false }) => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);

      script.onload = () => {
        window.FB.XFBML.parse();
      };
    }
  }, []);

  return (
    <div>
      <div id="fb-root"></div>
      <div
        className="fb-video"
        data-href={videoHref}
        data-width={width}
        data-show-text={showText}
      >
        <div className="fb-xfbml-parse-ignore">
          <blockquote cite={videoHref}>
            <a href={videoHref}>Watch this video on Facebook</a>
            <p>Posted on Facebook</p>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default FacebookVideo;