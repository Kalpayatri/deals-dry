import dbConnect from '../../../utils/dbConnect';
import Employee from '../../../models/Employee';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      return res.status(200).json(employee);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, email, mobile, designation, gender, courses, imgFile } = req.body;
      const updatedEmployeeData = {
        name,
        email,
        mobile,
        designation,
        gender,
        courses,
        imgFile: imgFile && Object.keys(imgFile).length ? imgFile : null
      };
      const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedEmployeeData, { new: true });
      if (!updatedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      return res.status(200).json({ message: 'Employee updated successfully', data: updatedEmployee });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      if (!deletedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      return res.status(200).json({ message: 'Employee deleted successfully', data: deletedEmployee });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed', allowedMethods: ['GET', 'PUT', 'DELETE'] });
  }
}
