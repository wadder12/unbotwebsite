/**
 * @file auth.js
 * 
 * @description this file is for handling auth and other auth things
 * @other this should be good to go nothing should be added unless store stuff in db instead of memory
 * @requires express
 * 
 * @wroteBy Wade aka @wadder12
 */
import { Router } from 'express';
import DiscordOAuth2 from 'discord-oauth2';
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();

const auth = Router();
const oauth = new DiscordOAuth2({
  clientId: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  redirectUri: process.env.DISCORD_REDIRECT_URI, // i dont even if i used this right but it works
});

auth.get('/login/discord', (req, res) => {
  const url = oauth.generateAuthUrl({
    scope: ["identify", "email"], 
    state: "randomState",
    redirectUri: process.env.DISCORD_REDIRECT_URI,
  });
  res.redirect(url);
});

auth.get('/auth/discord/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    const tokenResponse = await oauth.tokenRequest({
      code: code.toString(),
      scope: "identify email",
      grantType: "authorization_code",
      redirectUri: process.env.DISCORD_REDIRECT_URI,
    });

    if (tokenResponse.access_token) {
      const user = await oauth.getUser(tokenResponse.access_token);

      req.session.user = {
        id: user.id,
        username: user.username,
        avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`, 
        discriminator: user.discriminator,
        email: user.email, 
      };

      res.redirect('/dashboard');
    } else {
      throw new Error('No access token received');
    }
  } catch (error) {
    console.error('Error during Discord auth callback:', error);
    res.redirect('/login?error=authFailed');
  }
});

auth.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      console.error('Error during logout:', err);
      return res.redirect('/dashboard?error=logoutFailed');
    }
    // just goes home for now
    res.redirect('/');
  });
});

export default auth;
