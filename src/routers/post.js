import { Router } from 'express';
import { Post } from '../models';

const { login } = rootRequire('./perms');

const router = new Router();
router.get('/post', login, (req, res) => {
  res.render('post.njk');
  console.log(req.member.user);
});

router.post('/post', login, (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    minutes: req.body.minutes,
    author: req.member.user._id
  });

  post.save().then(() => {
    res.json({ body: req.body, sent: true });
  }).catch(() => {
    res.json({ body: req.body, sent: false });
  });
});

export default router;