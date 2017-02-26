import React, { Component } from 'react';

export default class Video extends Component {
  componentDidMount() {
    const videos = document.querySelectorAll('video');
    for (let i = 0, l = videos.length; i < l; i++) {
      const video = videos[i];
      const src = video.src || (function () {
        const sources = video.querySelectorAll("source");
        for (let j = 0, sl = sources.length; j < sl; j++) {
          const source = sources[j];
          const type = source.type;
          const isMp4 = type.indexOf("mp4") != -1;
          if (isMp4) return source.src;
        }
        return null;
      })();
      if (src) {
        const isYoutube = src && src.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
        if (isYoutube) {
          let id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
          id = (id.length > 1) ? id.splice(1) : id;
          id = id.toString();
          const mp4url = "http://www.youtubeinmp4.com/redirect.php?video=";
          video.src = mp4url + id;
        }
      }
    }
  }

  render() {
    return (
      <video id="rTZaM9C10Es" controls="true">
        <source src="www.youtube.com/watch?v=rTZaM9C10Es" type="video/mp4" />
      </video>
    );
  }
}
