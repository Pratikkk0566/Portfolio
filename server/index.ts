/**
 * ============================================
 * SERVER/INDEX.TS - EXPRESS SERVER ENTRY POINT
 * ============================================
 * 
 * This is the main server file that:
 * 1. Creates an Express application
 * 2. Sets up HTTP server
 * 3. Configures middleware (JSON parsing, logging)
 * 4. Registers API routes
 * 5. Serves the React frontend
 * 6. Starts listening on a port
 * 
 * FLOW:
 * Server starts → Middleware setup → Routes registered → 
 * Vite dev server (dev) or static files (prod) → Listen on port
 */

// Import Express framework for creating web server
import express, { type Request, Response, NextFunction } from "express";

// Import our route registration function
import { registerRoutes } from "./routes";

// Import static file serving function
import { serveStatic } from "./static";

// Import Node's HTTP module to create server
import { createServer } from "http";

// Create Express application instance
const app = express();

// Create HTTP server wrapping Express app
// This allows us to use WebSockets later if needed
const httpServer = createServer(app);

/**
 * TYPE AUGMENTATION
 * Extend Express's IncomingMessage type to include rawBody
 * This allows us to access the raw request body for webhooks
 */
declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

/**
 * MIDDLEWARE: JSON Body Parser
 * Parses incoming JSON requests and makes data available in req.body
 * Also stores raw body for webhook verification
 */
app.use(
  express.json({
    verify: (req, _res, buf) => {
      // Store raw body buffer for webhook signature verification
      req.rawBody = buf;
    },
  }),
);

/**
 * MIDDLEWARE: URL-Encoded Body Parser
 * Parses form data (application/x-www-form-urlencoded)
 * extended: false means use querystring library (simpler)
 */
app.use(express.urlencoded({ extended: false }));

/**
 * LOGGING UTILITY
 * Formats and logs messages with timestamp
 * 
 * @param message - The message to log
 * @param source - Where the log is coming from (default: "express")
 */
export function log(message: string, source = "express") {
  // Format time as "12:34:56 PM"
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Log with format: "12:34:56 PM [express] message"
  console.log(`${formattedTime} [${source}] ${message}`);
}

/**
 * MIDDLEWARE: Request Logger
 * Logs all API requests with timing information
 * Only logs routes starting with /api
 */
app.use((req, res, next) => {
  const start = Date.now(); // Record start time
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Intercept res.json to capture response data
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  // When response finishes, log the request
  res.on("finish", () => {
    const duration = Date.now() - start; // Calculate request duration
    
    // Only log API routes (not static files)
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      // Include response data in log
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next(); // Continue to next middleware
});

/**
 * ASYNC IIFE (Immediately Invoked Function Expression)
 * Allows us to use async/await at the top level
 */
(async () => {
  /**
   * STEP 1: Register API Routes
   * Sets up all /api/* endpoints (profile, projects, messages, etc.)
   */
  await registerRoutes(httpServer, app);

  /**
   * MIDDLEWARE: Error Handler
   * Catches any errors thrown in routes and sends proper response
   * Must be registered AFTER routes
   */
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    // Extract status code (default to 500)
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log the error for debugging
    console.error("Internal Server Error:", err);

    // Don't send response if headers already sent
    if (res.headersSent) {
      return next(err);
    }

    // Send error response
    return res.status(status).json({ message });
  });

  /**
   * STEP 2: Setup Frontend Serving
   * 
   * DEVELOPMENT MODE:
   * - Uses Vite dev server with hot module replacement
   * - Proxies API requests to Express
   * - Fast refresh for React components
   * 
   * PRODUCTION MODE:
   * - Serves pre-built static files from dist/public
   * - No Vite overhead, just static file serving
   */
  if (process.env.NODE_ENV === "production") {
    // Production: Serve static files
    serveStatic(app);
  } else {
    // Development: Setup Vite dev server
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  /**
   * STEP 3: Start Server
   * Listen on specified port (default: 5000)
   * 
   * PORT CONFIGURATION:
   * - Reads from environment variable PORT (Railway sets this automatically)
   * - Falls back to 5000 if not set
   * - Binds to 0.0.0.0 for Railway (not localhost)
   */
  const port = parseInt(process.env.PORT || "5000", 10);
  
  // Listen on 0.0.0.0 for Railway/production, localhost for development
  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";
  
  httpServer.listen(port, host, () => {
    log(`serving on port ${port}`);
    console.log(`\n🚀 Server ready at http://${host}:${port}\n`);
  });
})();

/**
 * EXECUTION FLOW SUMMARY:
 * 
 * 1. Import dependencies
 * 2. Create Express app and HTTP server
 * 3. Setup middleware (JSON parser, logger)
 * 4. Register API routes (/api/profile, /api/projects, etc.)
 * 5. Setup error handler
 * 6. Setup frontend serving (Vite dev or static files)
 * 7. Start listening on port 5000
 * 
 * REQUEST FLOW:
 * 
 * Client Request
 *     ↓
 * Middleware (JSON parser, logger)
 *     ↓
 * Routes (/api/* → API handlers)
 *     ↓
 * Error Handler (if error occurs)
 *     ↓
 * Response sent back to client
 * 
 * STATIC FILES:
 * Non-API requests → Vite dev server (dev) or static files (prod)
 */
