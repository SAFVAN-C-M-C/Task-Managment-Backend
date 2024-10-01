import server from "@/presentation/server";
import database from "@/_boot/config";

(async () => {
  try {
    // Start the server
    server;
    // Connect to the database
    await database();
  } catch (error: any) {
    console.error("Error on start up:", error);
  } finally {
    process.on("SIGINT", async () => {
      console.log("\n Server is shutting down...");
      process.exit();
    });
  }
})();
