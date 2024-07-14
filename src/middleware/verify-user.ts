import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma-client";
import Jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["authorization"];

  if (!token) return res.status(403).send({ message: "No token provided!" });

  try {
    const decoded = Jwt.verify(
      String(token.replace("Bearer ", "")),
      String(process.env.JWT_SECRET)
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        role: true,
        Mahasiswa: {
          select: {
            id: true,
            semester: {
              select: {
                semester: true,
              },
            },
          },
        },
      },
    });

    // to check if user is admin
    if (!user) return res.status(403).send({ message: "Unauthorized!" });
    if (user.role === "ADMIN") return next();

    let status = await prisma.statusKrs.findFirstOrThrow({
      where: { active: true },
    });

    if (status.status === "off") {
      return res.status(403).send({ message: "Forbidden!" });
    }

    // to check if the mahasiswa is the same as the mahasiswa in the request AND semester is greater than 3
    let checkIsMahasiswa =
      user.Mahasiswa &&
      user.Mahasiswa.id === (req.body.id || req.params.id || req.query.id);

    if (user.Mahasiswa && checkIsMahasiswa) return next();

    res.status(403).send({ message: "Unauthorized!" });
  } catch (error: any) {
    return res.status(401).send({ message: error.message || "Unauthorized!" });
  }
};

export default AuthMiddleware;
