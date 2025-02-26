import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';



//app config
const app = express();
const port = 4000

//middleware
app.use(express.json());
app.use(cors());

//db conection
connectDB();

//api endpoints

app.use("/api/food", foodRouter)


app.get('/', (req, res) => {
    res.send('API Working');

})

app.listen(port, () => {
    console.log('Server is running on port', port);
})

//mongodb+srv://doquocviet264:<db_password>@cluster0.tapp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
