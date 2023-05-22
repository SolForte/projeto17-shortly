export async function getUser(req, res) {
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

    const user = await db.query(`SELECT * FROM users WHERE id = $1;`, [userId]);

    if (user.rows.length === 0) {
      res.sendStatus(401);
      return;
    }

    const userUrls = await db.query(`SELECT * FROM urls WHERE userId = $1;`, [
      userId,
    ]);

    let visitedCount = 0;

    const shortenedUrls = userUrls.rows.map((url) => {
      visitedCount = visitedCount + url.visitCount;
      return {
        id: url.id,
        shortUrl: url.shortUrl,
        url: url.url,
        visitCount: url.visitCount,
      };
    });

    const body = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      visitCount: visitedCount,
      shortenedUrls,
    };

    res.status(200).send(body);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
