import {Repository} from "typeorm";
import {User} from "../entities/User";
import {Router} from "express";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../../config";

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticates a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Returns authentication token and user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsIn..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id: 
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *                     email:
 *                       type: string
 *                       example: "oU7kW@example.com"
 *                     isAdmin:
 *                       type: boolean
 *                       example: false
 *                     password:
 *                       type: string
 *                       example: "password123"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-20T12:00:00Z"
 *                     updatedAt:
 *                       type: string 
 *                       format: date-time
 *                       example: "2024-03-20T12:00:00Z"
 *       401:
 *         description: Wrong password
 *       404:
 *         description: User not found
 *       500:
 *          description: Error authenticating user
 */
export const authRoute = (userRepo: Repository<User>) => {
  const router = Router();

  router.post('/auth', async (req, res) => {
    try {
      const user = await userRepo.findOne({where: {username: req.body.username}});

      if (!user) {
        res.status(404).json({message: 'User not found'});
        return;
      }

      const validPass = bcryptjs.compareSync(req.body.password, user.password);

      if (!validPass) {
        res.status(401).send({
          message: 'Wrong password'
        });
        return;
      }

      const token = jsonwebtoken.sign({
        user: user
      }, config.secret, {
        expiresIn: 1440
      });

      res.json({
        token: token, user: user
      });
    } catch (e) {
      res.status(500).json({message: 'Error authenticating user, ' + e.message});
    }
  });

  return router;
}