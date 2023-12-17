import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as authController from './contollers/auth';
import * as postsController from './contollers/posts';
import * as commentsController from './contollers/comments';
import validateToken from "./middleware/validateToken";
import User from "./models/User";

const app = express()

app.use(cors());
app.use(express.json());

app.post('/signup', authController.register);
app.post('/login', authController.logIn);
app.post('/token/refresh', authController.refreshJWT);
app.get('/profile', validateToken, authController.profile);

app.post('/posts', validateToken, postsController.create);
app.get('/posts', postsController.getAllPosts);
app.get('/posts/:id', postsController.getPost);
app.put('/posts/:id', validateToken, postsController.updatePost);
app.delete('/posts/:id', validateToken, postsController.deletePost);

app.post('/posts/:postId/comments', validateToken, commentsController.createComment)
app.delete('/posts/:postId/comments/:commentId', validateToken, commentsController.deleteComment)

const mongoURL = process.env.MONGO_DOCKER_URI;

if (!mongoURL) throw Error('Missing db url');

mongoose.connect(mongoURL)
    .then(() => {
        const port =process.env.PORT || 8000;
       /*  const admin = User.findOne({username: 'admin'})
        if (!admin) {
            User.create({
                username: 'admin',
                password: 'abcd'
            })
        } */
        app.listen(port, () => {
            console.log('Server listening on port ' + port);
        })
    })
