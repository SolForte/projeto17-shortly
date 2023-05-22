import { db } from "../database/db.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (user.rowCount > 0) {
      res.sendStatus(409);
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
