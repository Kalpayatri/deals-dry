import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;
      let user = await User.findOne({ username });

      if (!user) {
        user = new User({ username, password });
        await user.save();
        return res.status(201).json({ message: 'User registered successfully' });
      } else {
        if (user.password === password) {
          return res.status(200).json({ message: 'Login successful' });
        } else {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    res.status(405).json({ error: 'Method Not Allowed', allowedMethods: ['POST'] });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
