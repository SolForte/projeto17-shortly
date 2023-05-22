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

    let userVisitCount = 0;

    const shortenedUrls = userUrls.rows.map((url) => {
      userVisitCount = userVisitCount + url.visitCount;
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
      visitCount: userVisitCount,
      shortenedUrls,
    };

    res.status(200).send(body);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getRanking(_req, res) {
  try {
    const rankingQuery = `
    SELECT users.id, users.name, 
    COUNT (urls.id) AS "linksCount",
    SUM(urls."visitCount") AS "visitCount"
    FROM users LEFT JOIN urls ON urls."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    `;

    const ranking = await db.query(rankingQuery);

    const rankingSort = ranking.rows.map((user) => {
      return {
        id: user.id,
        name: user.name,
        linksCount: user.linksCount,
        visitCount: user.visitCount,
      };
    });

    res.status(200).send(rankingSort);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
