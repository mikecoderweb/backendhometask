import http from "http";

let mikecoderStudents = [
  { id: 1, name: "Ali", age: 15 },
  { id: 2, name: "Laylo", age: 14 },
];

let mikecoderIdCounter = 3;

const mikecoderStats = {
  totalRequests: 0,
  lastRequestTime: null,
};

function mikecoderTrackRequest(req) {
  mikecoderStats.totalRequests++;
  mikecoderStats.lastRequestTime = new Date().toISOString();
  console.log(`[REQUEST] ${req.method} ${req.url}`);
}

const mikecoderServer = http.createServer((req, res) => {
  mikecoderTrackRequest(req);

  if (req.method === "GET" && req.url === "/students") {
    console.log("[GET /students] HANDLER START");

    setTimeout(() => {
      console.log("[GET /students] TIMEOUT CALLBACK");

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          students: mikecoderStudents,
        })
      );
    }, 500);
  } else if (req.method === "POST" && req.url === "/students") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const parsedBody = JSON.parse(body);

        if (!parsedBody.name || !parsedBody.age) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "INVALID JSON" }));
        }

        const newStudent = {
          id: mikecoderIdCounter++,
          name: parsedBody.name,
          age: parsedBody.age,
        };

        mikecoderStudents.push(newStudent);

        setImmediate(() => {
          console.log("[POST /students] AFTER PARSING BODY (setImmediate)");
        });

        res.writeHead(201, {
          "Content-Type": "application/json",
        });

        res.end(JSON.stringify(mikecoderStudents));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "INVALID JSON" }));
      }
    });
  } else if (req.method === "GET" && req.url === "/stats") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        totalRequests: mikecoderStats.totalRequests,
        studentsCount: mikecoderStudents.length,
        lastRequestTime: mikecoderStats.lastRequestTime,
      })
    );
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        error: "NOT FOUND",
      })
    );
  }
});

mikecoderServer.listen(3000, () => {
  console.log("🚀 Mikecoder Student API running on http://localhost:3000");
});
