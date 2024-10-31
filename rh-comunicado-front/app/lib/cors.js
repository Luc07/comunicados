import Cors from "cors";
import initMiddleware from "./init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.startsWith("put-the-url-here")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

export default cors;
