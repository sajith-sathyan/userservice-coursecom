  import authRoutes from "./auth.js";
  import userRoutes from './user.js'

  export default function routes(app, express) {
    app.use("/auth", authRoutes(express));
    app.use("/user", userRoutes(express));
   
  }
    