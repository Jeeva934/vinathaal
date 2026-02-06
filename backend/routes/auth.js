// // routes/auth.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const crypto = require('crypto');
// const generateIdToken = require('../utils/idtoken_generator');

// // This exports a "factory" function.
// // It creates the router once it receives its dependencies (db, transporter, config).
// module.exports = function(db, transporter, config) {
//   const router = express.Router();

//   const sendResetEmail = async (email, token) => {
//     const resetLink = `${config.FRONTEND_URL}/reset-password?token=${token}`;
//     const mailOptions = {
//       from: `Vinathaal AI <${config.EMAIL_USER}>`,
//       to: email,
//       subject: 'Password Reset Request',
//       html: `
//         <!DOCTYPE html>
//         <html lang="en">
//           <head>
//             <meta charset="UTF-8" />
//             <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//             <title>Password Reset</title>
//           </head>
//           <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
//             <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
//               <h2>Password Reset Request</h2>
//               <p>You requested a password reset. Click the button below to proceed:</p>
//               <p>
//                 <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
//                   Reset Password
//                 </a>
//               </p>
//               <p>This link will expire in 1 hour.</p>
//               <hr />
//               <p style="font-size: 0.9em; color: #555;">If you did not request this, you can safely ignore this email.</p>
//             </div>
//           </body>
//         </html>
//       `,
//     };  
//     await transporter.sendMail(mailOptions);
//     console.log('Reset email sent successfully to:', email);
//   };

//   // SIGNUP
//   router.post('/signup', async (req, res) => {
//     try {
//       const { name, email, password } = req.body;
//       if (!name || !email || !password) {
//         return res.status(400).json({ message: 'Name, email, and password are required.' });
//       }

//       const [rows] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
//       if (rows && rows.length > 0) {
//         return res.status(409).json({ message: 'Email already exists.' });
//       }

//       const passwordHash = await bcrypt.hash(password, 10);
//       const idtoken = generateIdToken('USER', 10);
//       const api_token = generateIdToken('vina_', 16);
//       console.log("SignUp api_token:", api_token)
//       // await db.query('INSERT INTO users SET ?', {id_token: idtoken, name, email, password_hash: passwordHash, role: 'user', api_token: api_token });
//       await db.run(`INSERT INTO users (id_token, name, email, password_hash, role, api_token) 
//         VALUES (?, ?, ?, ?, ?, ?)`,
//         [idtoken, name, email, passwordHash, 'user', api_token]
//       );
//       res.status(201).json({ message: 'User registered successfully.' });
//     } catch (error) {
//       console.error('Signup Error:', error);
//       res.status(500).json({ message: 'Server error during signup.' });
//     }
//   });

//   // LOGIN
//   router.post("/login", async (req, res) => {
//     try {
//       const { email, password } = req.body;

//       if (!email || !password) {
//         return res.status(400).json({ message: "Email and password are required" });
//       }

//       // 1. Find user by email
//       const [rows] = await db.query(
//         "SELECT id, id_token, name, email, password_hash, role, api_token FROM users WHERE email = ?",
//         [email]
//       );

//       if (rows.length === 0) {
//         return res.status(401).json({ message: "Invalid email or password" });
//       }

//       const user = rows[0];
//       console.log("Database-la iruka email:", user.email);
//       console.log("Database-la iruka hash:", user.password_hash);

//       const isMatch = await bcrypt.compare(password, user.password_hash);
//       console.log("Bcrypt match result:", isMatch); // Ithu 'false' vandha password match aagala

//             // 2. Compare password
      
//       if (!isMatch) {
//         return res.status(401).json({ message: "Invalid email or password" });
//       }

//       // 3. Ensure api_token exists (for old users)
//       let apiToken = user.api_token;
//       if (!apiToken) {
//         apiToken = "vina_" + crypto.randomBytes(16).toString("hex");
//         await db.query(
//           "UPDATE users SET api_token = ? WHERE id = ?",
//           [apiToken, user.id]
//         );
//       }

//       // 4. Success response
//       res.json({
//         message: "Login successful",
//         user: {
//           id: user.id,
//           id_token: user.id_token,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         },
//         api_token: apiToken,
//       });

//     } catch (err) {
//       console.error("Login Error:", err);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });

//   // FORGOT PASSWORD
//   router.post('/forgot-password', async (req, res) => {
//     try {
//       const { email } = req.body;
//       if (!email) {
//         return res.status(400).json({ message: 'Email is required.' });
//       }
      
//       const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//       if (!user.length) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       const resetToken = crypto.randomBytes(32).toString('hex');
//       const resetTokenExpires = new Date(Date.now() + 3600000);

//       await db.query(
//         "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?",
//         [resetToken, resetTokenExpires, user[0].id]
//       );

//       await sendResetEmail(email, resetToken); 

//       res.status(200).json({ message: 'Password reset link sent successfully.' });
//     } catch (error) {
//       console.error('Forgot Password Error:', error);
//       res.status(500).json({ message: 'Failed to process request. The email could not be sent.' });
//     }
//   });

//   // RESET PASSWORD
//   router.post('/reset-password', async (req, res) => {
//     try {
//       const { token, newPassword } = req.body;
//       if (!token || !newPassword || newPassword.length < 6) {
//         return res.status(400).json({ message: 'Valid token and a password of at least 6 characters are required.' });
//       }

//       const [result] = await db.query(
//         "SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()",
//         [token]
//       );
  
//       if (!result.length) {
//         return res.status(400).json({ message: "Invalid or expired token" });
//       }

//       const hashedPassword = await bcrypt.hash(newPassword, 10);

//       await db.query(
//         "UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?",
//         [hashedPassword, result[0].id]
//       );

//       res.status(200).json({ message: 'Password has been reset successfully.' });
//     } catch (error) {
//       console.error('Reset Password Error:', error);
//       res.status(500).json({ message: 'Server error during password reset.' });
//     }
//   });

//   return router;
// };


const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const generateIdToken = require('../utils/idtoken_generator');

module.exports = function(db, transporter, config) {
  const router = express.Router();

  const sendResetEmail = async (email, token) => {
    const resetLink = `${config.FRONTEND_URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: `Vinathaal AI <${config.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>Click the button below to reset your password:</p>
          <a href="${resetLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
          <p>This link will expire in 1 hour.</p>
        </div>
      `,
    };  
    await transporter.sendMail(mailOptions);
  };

  // SIGNUP
  router.post('/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
      }

      // SQLite check: row exists ah nu pakkalam
      const existingUser = await db.get('SELECT email FROM users WHERE email = ?', [email]);
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists.' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const idtoken = generateIdToken('USER', 10);
      const api_token = generateIdToken('vina_', 16);

      // SQLite INSERT (SET ? kku badhula values specify pannanum)
      await db.run(
        `INSERT INTO users (id_token, name, email, password_hash, role, api_token) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [idtoken, name, email, passwordHash, 'user', api_token]
      );

      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error('Signup Error:', error);
      res.status(500).json({ message: 'Server error during signup.' });
    }
  });

  // LOGIN
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // SQLite Single Row Fetch
      const user = await db.get(
        "SELECT id, id_token, name, email, password_hash, role, api_token FROM users WHERE email = ?",
        [email]
      );

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      let apiToken = user.api_token;
      if (!apiToken) {
        apiToken = "vina_" + crypto.randomBytes(16).toString("hex");
        await db.run(
          "UPDATE users SET api_token = ? WHERE id = ?",
          [apiToken, user.id]
        );
      }

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          id_token: user.id_token,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        api_token: apiToken,
      });
    } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // FORGOT PASSWORD
  router.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      const user = await db.get("SELECT id FROM users WHERE email = ?", [email]);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      // SQLite-la direct NOW() irukadhu, standard date format-la save pannuvom
      const resetTokenExpires = new Date(Date.now() + 3600000).toISOString();

      await db.run(
        "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?",
        [resetToken, resetTokenExpires, user.id]
      );

      await sendResetEmail(email, resetToken); 
      res.status(200).json({ message: 'Password reset link sent successfully.' });
    } catch (error) {
      console.error('Forgot Password Error:', error);
      res.status(500).json({ message: 'Server error during forgot password.' });
    }
  });

  // RESET PASSWORD
  router.post('/reset-password', async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: 'Valid inputs required.' });
      }

      // SQLite token check
      const user = await db.get(
        "SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > ?",
        [token, new Date().toISOString()]
      );
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.run(
        "UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?",
        [hashedPassword, user.id]
      );

      res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
      console.error('Reset Password Error:', error);
      res.status(500).json({ message: 'Server error during reset.' });
    }
  });

  return router;
};