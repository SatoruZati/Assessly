import express, { Request, Response } from "express";
import cors from "cors";

import authRoutes from './Routes/auth.routes';

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

app.get("/", (req: Request, res: Response) => {
        res.json({
                message: "GradeGenie Server is alive!"
        });
});

const PORT = 3000;
app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
});
