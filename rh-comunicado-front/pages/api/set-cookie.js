import cors from "@/app/lib/cors";
import axios from "axios";
import { API_URL } from "@/app/util/apiUrl";

export default async function handler(req, res) {
  await cors(req, res);
  if (req.method === "GET") {
    if (
      req.query.user != "undefined" &&
      req.query.password != "undefined" &&
      req.query.id != "undefined"
    ) {
      const loginResponse = await axios.post(`${process.env.API_URL}auth/login`, {
        user: req.query.user,
        password: req.query.password,
      });

      const token = loginResponse.data.token;
      const maxAge = 24 * 60 * 60;
      res.setHeader("Set-Cookie", [
        `token_comunicados=${token}; Path=/; Max-Age=${maxAge};`,
        `token_user=${req.query.id}; Path=/; Max-Age=${maxAge};`,
        `role=${req.query.role}; Path=/; Max-Age=${maxAge};`,
      ]);

      res.redirect(302, `${process.env.HOME}`);
    } else {
      res.redirect(302, `${process.env.CONNECT}`);
    }
  } else {

    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
