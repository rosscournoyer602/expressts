import { Request, Response, NextFunction } from 'express';
import { get, use, controller, post } from './decorators';
import { bodyValidator } from '../middleware/bodyValidator'

@controller('/auth')
class LoginController {

  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Passsword</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @use(bodyValidator(['email', 'password']))
  postlogin(req: Request, res: Response): void {
    req.session = { loggedIn: true };
    res.redirect('/');
  }

  @get('/logout')
  logout(req: Request, res: Response): void  {
    req.session = undefined;
    res.redirect('/');
  };
}