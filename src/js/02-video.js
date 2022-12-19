import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const VIDEO_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
onAuditTime();

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(evt) {
  console.log('played the video!');
  console.log(evt);

  localStorage.setItem(VIDEO_KEY, JSON.stringify(evt));
}

function onAuditTime() {
  const savedTime = localStorage.getItem(VIDEO_KEY);
  const parseTime = JSON.parse(savedTime);
  if (parseTime) {
    player.setCurrentTime(parseTime.seconds);
  }
}
