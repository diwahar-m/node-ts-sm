import express, {Express, Request, Response, NextFunction} from "express"; 
import { nextTick } from "node:process";
import { IUser, User } from "./models/User";

const app: Express = express();
const port = 3000

app.use(express.json())

interface CustomRequest extends Request {
    startTime?: number 
}

// middleware 
app.use((req: CustomRequest, res: Response, next: NextFunction) => {
    req.startTime = Date.now(); 
    next();
})


app.get('/', (req: Request, res: Response)=> {
    res.send()
})

app.get('/users', async(req, res)=> {
    try {
        const users: IUser[] = await User.find({});
    } catch(e){
        res.status(400).json({message: 'Some error occured!'})
    }
})

//  users based on id
app.get('/user/:id', (req: Request<{id: string}>, res:Response)=> {
    const {id} = req.params;
    res.json({id})
})

// 
interface User {
    name: string, 
    email: string
}

app.post('/user', (req: Request<{}, {}, User>, res: Response)=> {
    const {name, email} = req.body;
    res.json({
        message: `User created ${name} - ${email}`
    })
})

app.listen(port, ()=> console.log(`Server running on ${port}`))