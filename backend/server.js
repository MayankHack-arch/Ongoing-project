import app from './index.js';
const port=process.env.PORT || 4001;

app.listen(port, ()=>{
    console.log(`app is running on ${port}`)
})