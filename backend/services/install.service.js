const conn = require("../config/db.config");
const fs = require("fs");

async function install() {
  const queryfile = __dirname + "/sql/initial-queries.sql";
  console.log("Reading SQL file from:", queryfile);

  if (!fs.existsSync(queryfile)) {
    console.error("SQL file not found!");
    return { message: "SQL file missing", status: 500 };
  }

  const lines = fs.readFileSync(queryfile, "utf-8").split(/\r?\n/);
  let queries = [];
  let finalMessage = {};
  let templine = "";

  lines.forEach((line) => {
    if (line.trim().startsWith("--") || line.trim() === "") {
      return;
    }
    templine += line;
    if (line.trim().endsWith(";")) {
      queries.push(templine.trim());
      templine = "";
    }
  });

  console.log(`Executing ${queries.length} queries...`);

  for (let i = 0; i < queries.length; i++) {
    try {
      console.log("Executing query:", queries[i]);
      await conn.query(queries[i]);
      console.log("✅ Table created successfully.");
    } catch (err) {
      console.error(
        "❌ Error creating table:",
        err.message,
        "\nQuery:",
        queries[i]
      );
      finalMessage.message = "Not all tables were created.";
      break; // Exit the loop after the first error
    }
  }

  finalMessage.message =
    finalMessage.message || "All tables created successfully.";
  finalMessage.status = finalMessage.message.includes("Not all") ? 500 : 200;
  return finalMessage;
}

module.exports = { install };
