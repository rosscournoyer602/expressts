import { Request, Response } from 'express';
import { get, controller, use } from './decorators';
import { requireAuth } from '../middleware/requireAuth';

@controller('')
class RootController {

  @get('/')
  getRoot (req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <div>You are logged in</div>
          <div><a href="/protected">You can visit the page</a></div>
          <a href="/auth/logout">Logout</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/auth/login">Login</a>
        </div>
      `);
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to the page \n <a href="/auth/logout">Logout</a>');
  }
}