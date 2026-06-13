/**
 * Firebase Cloud Functions
 * 
 * Core functionality for The Frog Project ecosystem
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const { exec } = require('child_process');
const util = require('util');

admin.initializeApp();

// Helper function to execute shell commands with timeout
async function runCommand(cmd, timeout = 30000) {
  try {
    const { stdout, stderr } = await execPromise(cmd, { timeout });
    return { success: true, output: stdout, error: stderr };
  } catch (error) {
    return { success: false, output: error.stdout, error: error.stderr || error.message };
  }
}

// CORS handler for HTTP functions
const corsHandler = cors({ origin: true });

// Promisify exec for async/await usage
const execPromise = util.promisify(exec);

// Export any remaining core functions needed by the project
// (Currently none, since we removed the updates feature)
