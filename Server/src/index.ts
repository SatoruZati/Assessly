import express, { Request, Response } from "express";
import cors from "cors";

import authRoutes from './Routes/auth.routes';
import assignmentRoutes from './Routes/assignment.routes';
import submissionRoutes from './Routes/submission.routes';
import userRoutes from './Routes/user.routes';
import testRoutes from './Routes/test.route'

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

declare global{
    namespace Express{
        export interface Request{
            userId?: string
        }
    }
}

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/assignments", assignmentRoutes); 
app.use("/api/v1/submissions", submissionRoutes); 
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tests", testRoutes);


app.get("/", (req: Request, res: Response) => {
        res.json({
                message: "Server is alive!"
        });
});

const PORT = 3000;
app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
});
