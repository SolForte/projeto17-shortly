import { db } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (user.rowCount > 0) {
      res.sendStatus(409);
      return;
    }

    if (password === confirmPassword) {
      const hash = bcrypt.hashSync(password, 6);

      await db.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
        [name, email, hash]
      );
    }

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (user.rowCount === 0) {
      res.sendStatus(401);
      return;
    }

    const isValid = bcrypt.compareSync(password, user.rows[0].password);

    if (!isValid) {
      res.sendStatus(401);
      return;
    }

    const token = uuid();

    await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [
      token,
      user.rows[0].id,
    ]);

    res.status(200).send({ token });
  } catch (error) {
    res.sendStatus(500).send(error.message);
  }
}

export async function logout(req, res) {
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

    await db.query(`DELETE FROM sessions WHERE token=$1;`, [token]);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
