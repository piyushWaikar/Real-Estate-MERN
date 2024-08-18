import express from 'express'
import cors from 'cors'

import postRoute from './routes/post.route.js'
import authRoute from './routes/auth.route.js'
import testRoute from './routes/test.route.js'
import userRoute from './routes/user.route.js'


import cookieParser from 'cookie-parser'
const app = express();
app.use(express.json());
app.use(cookieParser());

// opening the access point from the specific port and also credentials true because we also want to send the cookies
app.use(cors({ origin : process.env.CLIENT_URL, credentials:true }))

app.use('/api/posts',postRoute);

app.use('/api/auth',authRoute);

app.use('/api/test',testRoute);

app.use('/api/users',userRoute);

app.get('*',(req,res)=>{
    res.json({message:"Universal link is here"})
})


app.listen(3000 , ()=>{
    console.log('server is running at 3000');
    
});