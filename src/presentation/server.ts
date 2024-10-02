import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { routes } from "@/infrastructure/routes";
import { dependencies } from "@/_boot/dependencies";
import errorHandler from "@/_lib/error/errorHandler";
import { app ,server} from "@/infrastructure/socket";

dotenv.config();


const PORT: number = Number(process.env.PORT) || 4040; //either run on 4040 or 8080
//middleware
app.use(
  cors({
    origin: [String(process.env.CLIENT_URL)],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//route handling
app.use("/api/", routes(dependencies));
app.use("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "Api Not found" });
});
// error handling
app.use(errorHandler);

//listning to the port
server.listen(PORT, () => {
  console.log(`connected to task manager defaultly at ${PORT}`);
});

export default app;
