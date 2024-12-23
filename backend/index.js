import connectToMongo from "./db.js";
import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import student from "./routes/student.js";


// Connected to MongoDB
connectToMongo();



const app = express()
const port = process.env.PORT || 5001;

app.use(express.json());
// app.use(cors("*"));
//app.use(cors({ origin: [
//	"http://13.235.168.107:3001",
//	"http://13.235.168.107:3002",
//	"http://localhost:3000",
//],
//methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
 //   allowedHeaders: ['Content-Type', 'Authorization'],
   // preflightContinue: false, 
//}));

// app.use("*", cors({
   // origin: [
      //  "http://13.235.168.107:3001", // Your frontend address
      //  "http://13.235.168.107:3002",
    //    "http://localhost:3000", // Localhost, if applicable
  //  ],
  //  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
 //   allowedHeaders: ['Content-Type', 'Authorization'],
 //   preflightContinue: false,  // Handle preflight requests automatically
//    optionsSuccessStatus: 204, // Successful preflight response
//}));



// app.options('*', cors());  // Ensure OPTIONS request is handled properly
app.use(cors({
    origin: '*',  // Allow all origins temporarily for debugging
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));



// Default endpoint for the backend-app
app.get('/', (req, res) => {
    res.send('This is EventGateKeeper - Backend!');
})

// Available routes
app.use('/api/auth', auth);
app.use('/api/student', student);

app.listen(port, () => {
    console.log(`Server is live and listening on port http://localhost:${port}`)
})
