import allowedOrigins from "./allowedOrigins";

interface CorsOptions {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => void;
  optionsSuccessStatus: number;
}

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
};

export default corsOptions;