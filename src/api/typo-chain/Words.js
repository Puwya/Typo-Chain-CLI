import axios from 'axios';

class Words {
  static async Get() {
    try {
      const res = await axios.get('/api/words');
      return res.data;
    } catch (err) {
      return err;
    }
  }
}

export default Words;
