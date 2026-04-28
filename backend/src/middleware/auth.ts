import { verifyToken } from "../auth/jwt";
import { getCookie } from "hono/cookie";
import type { Context, Next } from "hono";
import type { HonoEnv } from "../types";

export async function authMiddleware(c: Context<HonoEnv>, next: Next) {
  let token: string | undefined;

  const authHeader = c.req.header("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  } else {
    token = getCookie(c, "access_token");
  }

  if (!token) {
    return c.json({ status: "error", message: "Unauthorized: missing token" }, { status: 401 });
  }

  const payload = await verifyToken(token);

  if (!payload || payload.type !== "access") {
    return c.json({ status: "error", message: "Unauthorized: invalid or expired token" }, { status: 401 });
  }

  c.set("user", payload);
  await next();
}
