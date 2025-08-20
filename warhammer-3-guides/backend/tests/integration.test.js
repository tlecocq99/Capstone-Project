const request = require("supertest");
const express = require("express");

const app = express();
app.get("/test", (req, res) => res.status(200).json({ message: "ok" }));

describe("Integration: /test endpoint", () => {
  it("should return 200 and message ok", async () => {
    const res = await request(app).get("/test");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("ok");
  });
});
