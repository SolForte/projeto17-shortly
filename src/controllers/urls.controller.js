import { db } from "../database/db.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
  const { url } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const user = await db.query(`SELECT * FROM sessions WHERE token=$1;`, [
      token,
    ]);

    if (user.rows.length === 0) {
      res.sendStatus(401);
      return;
    }

    const shortUrl = nanoid(10);

    const insertShortUrl = await db.query(
      `INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1, $2, $3)`,
      [user.rows[0].userId, shortUrl, url]
    );

    res.status(201).send({ id: insertShortUrl.rows[0].id, shortUrl: shortUrl });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
