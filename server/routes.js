const passport = require('passport');
const https = require('https');

const userController = require('./controllers/UserController');

const YOUTUBE_API_KEY = require('./config/youtube.conf');
const MUSIXMATCH_API_KEY = require('./config/musixmatch.conf');

module.exports = (app) => {
  app.get('/auth/spotify',
    passport.authenticate('spotify'),
    // this function doesn't get called
    // callback gets called on successful login
    (req, res) => {}
  );

  app.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    (req, res) => {
      req.session.user = req.session.passport.user;
      res.redirect('/');
    }
  );

  app.get('/logout', (req, res) => {
    req.session.destroy(e => {
      req.logout();
      res.redirect('/');
    });
  });

  app.get('/api/youtube-search/:song', (req, res0) => {
    const { song } = req.params;
    const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
    const STATIC_OPTS = 'part=snippet&maxResults=1&order=relevance';
    const opts = `&q=${song}&key=${YOUTUBE_API_KEY}`;
    const url = `${ROOT_URL}?${STATIC_OPTS}${opts}`;

    https.get(url, res1 => {
      res1.on('data', data => {
        res0.send(data.toString());
      });
    }).on('error', e => {
      console.log(e);
    });
  });

  app.get('/api/lyrics-search/:lyrics', (req, res0) => {
    const { lyrics } = req.params;
    const ROOT_URL = 'https://api.musixmatch.com/ws/1.1/track.search';
    const STATIC_OPTS = 'page_size=3&page=1&s_track_rating=desc';
    const opts = `&apikey=${MUSIXMATCH_API_KEY}&q_lyrics=${lyrics}`;
    const url = `${ROOT_URL}?${STATIC_OPTS}${opts}`;

    https.get(url, res1 => {
      res1.setEncoding('utf8');
      res1.on('data', data => {
        if (JSON.parse(data)) {
          const {
            track_name,
            artist_name
          } = JSON.parse(data).message.body.track_list[0].track;

          res0.redirect(`/api/youtube-search/${artist_name} ${track_name}`);
        }
      });
    }).on('error', e => {
      console.log(e);
    });
  });
};
