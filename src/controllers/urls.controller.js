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
    const session = await db.query(`SELECT * FROM sessions WHERE token=$1;`, [
      token,
    ]);

    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }

    const shortUrl = nanoid(10);

    const insertShortUrl = await db.query(
      `INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1, $2, $3) RETURNING *;`,
      [session.rows[0].userId, shortUrl, url]
    );

    res.status(201).send({
      id: insertShortUrl.rows[0].id,
      shortUrl,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;

  try {
    const url = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);

    if (url.rowCount === 0) {
      res.sendStatus(404);
      return;
    }

    res.status(200).send({
      id: url.rows[0].id,
      shortUrl: url.rows[0].shortUrl,
      url: url.rows[0].url,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function openShortUrlById(req, res) {
  const { shortUrl } = req.params;
  try {
    const url = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [
      shortUrl,
    ]);

    if (url.rowCount === 0) {
      res.sendStatus(404);
      return;
    }

    await db.query(
      `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1`,
      [url.rows[0].id]
    );

    res.redirect(url.rows[0].url);
    return;
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export async function deleteUrlById(req, res) {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token=$1;`, [
      token,
    ]);

    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }

    const { userId } = session.rows[0];

    const url = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);

    if (url.rowCount === 0) {
      res.sendStatus(404);
      return;
    }

    if (url.rows[0].userId !== userId) {
      res.sendStatus(401);
      return;
    }

    await db.query(`DELETE FROM urls WHERE id = $1 AND "userId" = $2`, [
      id,
      userId,
    ]);

    res.sendStatus(204);
    return;
  } catch (error) {
    res.sendStatus(500).send(error.message);
    return;
  }
}
