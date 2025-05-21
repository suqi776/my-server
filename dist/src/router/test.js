import axios from 'axios';
import { Router } from 'express';
const router = Router();
const url = 'https://api.oick.cn';
// 设置 GET 路由
router.get('/hot', async (req, res) => {
    const type = typeof req.query.type === 'string' ? req.query.type : 'zhihu';
    try {
        // 动态构建请求 URL
        const response = await axios.get(`${url}/api/hot?type=${type}`);
        // 将响应数据发送到客户端
        res.json(response.data);
    }
    catch (error) {
        console.error('请求出错:', error);
        res.status(500).send('服务器错误'); // 发送错误状态码
    }
});
// 设置 POST 路由
router.post('/hot', async (req, res) => {
    const type = req.body.type || 'zhihu';
    if (typeof type !== 'string') {
        return res.status(400).json({ error: '缺少必要的 type 参数' });
    }
    try {
        const response = await axios.get(`${url}/api/hot?type=${type}`);
        res.json(response.data);
    }
    catch (error) {
        console.error('请求出错:', error);
        res.status(500).send('服务器错误');
    }
});
export default router;
