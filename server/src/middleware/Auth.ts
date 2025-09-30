import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from "passport-jwt";
import { ADMIN_SECRET_KEY } from "../configs/config";
import { getAdmin } from "../models/adminModel";
import { JwtPayload } from "jsonwebtoken";

// Options

const jwt_options = {
  secretOrKey: ADMIN_SECRET_KEY!,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export function strategy() {
  return new JwtStrategy(jwt_options, async (jwt_payload, done) => {
    if (!jwt_payload.sub) {
      return done(null, false);
    }

    const user = await getAdmin({ adminId: Number(jwt_payload.sub) });
    const safeUser = {
      id: user?.adminId,
      username: user?.username,
      email: user?.email,
    };

    if (safeUser) {
      return done(null, safeUser);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
}
