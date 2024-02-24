// TODO WHY?
// eslint-disable-next-line import/default
import sqlite3 from "sqlite3";
import * as argon2 from "argon2";

const sqlite3x = sqlite3.verbose();
const db = new sqlite3x.Database("../dev.db");

function get(query) {
	return new Promise((res, rej) => {
		db.get(query, (err, row) => {
			if (err) {
				rej(err);
			} else {
				res(row);
			}
		});
	});
}

function exec(query) {
	return new Promise((res, rej) => {
		db.exec(query, (err) => {
			if (err) {
				rej(err);
			} else {
				res();
			}
		});
	});
}

db.serialize(async () => {
	console.log("serialize() inside");

	const row = await get(`SELECT password
      FROM User
      WHERE username = "admin";
     `);

	const hash = await argon2.hash(row.password, {
		type: "2",
	});

	await exec(`
      UPDATE User
      SET password = '${hash}'
      WHERE username = "admin";
      `).catch((err) => console.error("failed to update password with hash", err));

	db.close(() => {
		console.log("closed");
	});
});
