import {Repository} from "typeorm";
import {User} from "../entities/User";
import {Router} from "express";
import bcryptjs from "bcryptjs";

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Creates a new user
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Successfully created the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "john_doe"
 *                   description: Unique username of the user
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *                   description: Unique email of the user
 *                 password:
 *                   type: string
 *                   example: "hashed_password"
 *                   description: Hashed password of the user
 *                 salt:
 *                   type: string
 *                   example: "random_salt"
 *                   description: Salt used for password hashing
 *               example:
 *                 username: "john_doe"
 *                 email: "john.doe@example.com"
 *                 password: "hashed_password"
 *                 salt: "random_salt"
 *       400:
 *         description: Invalid request, missing username, email, or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating user, <error details>"
 *       500:
 *         description: Server error while creating user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating user, <error details>"
 *   get:
 *     summary: Retrieves a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: 
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: "john_doe"
 *                   email:
 *                     type: string
 *                     example: "oU7kW@example.com"
 *                   isAdmin:
 *                     type: boolean
 *                     example: false
 *                   password:
 *                     type: string
 *                     example: "password123"
 *                   salt:
 *                     type: string
 *                     example: "random_salt"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-03-20T12:00:00Z"
 *                   updatedAt:
 *                     type: string 
 *                     format: date-time
 *                     example: "2024-03-20T12:00:00Z"
 *             example:
 *               - id: 1
 *                 username: "john_doe"
 *                 email: "john.doe@example.com"
 *                 isAdmin: false
 *                 password: "hashed_password"
 *                 salt: "random_salt"
 *                 createdAt: "2024-03-20T12:00:00Z"
 *                 updatedAt: "2024-03-20T12:00:00Z"
 *               - id: 2
 *                 username: "jane_doe"
 *                 email: "jane.doe@example.com"
 *                 isAdmin: true
 *                 password: "hashed_password"
 *                 salt: "random_salt"
 *                 createdAt: "2024-03-21T12:00:00Z"
 *                 updatedAt: "2024-03-21T12:00:00Z"
 *       500:
 *         description: Server error while fetching users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching users, <error details>"
 */

export const userRoute = (userRepo: Repository<User>) => {
  const router = Router();

  router.route('/users')
  
  
  .post(async (req, res) => {
    try {
      const {username, email, password} = req.body;
      if (!username || !email || !password) {
        res.status(400).json({message: 'Invalid request'});
        return;
      }

      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(password, salt);
      const user = new User()
        .setUsername(username)
        .setEmail(email)
        .setPassword(hash)
        .setSalt(salt);

      await userRepo.save(user);
      res.status(201).json(user);
    } catch (e) {
      res.status(400).json({message: 'Error creating user, ' + e.message});
    }
  })
  
  
  .get(async (_req, res) => {
    try {
      const users = await userRepo.find();
      res.status(200).json(users);
    } catch (e) {
      res.status(500).json({message: 'Error fetching users, ' + e.message});
    }
  });

  return router;
}