module.exports = {
  "scripts": {
    "dev:full": {
      "command": "concurrently \"npm run backend\" \"npm run dev\"",
      "env": {
        "FORCE_COLOR": true
      }
    }
  }
};