import { get } from '../utils/request.js'

const api = {
    //获取歌单
    getMusicList(params) {
        return get('api/playlist/track/all', params)
    },
    // //验证码登录接口
    // sent(parmas) {
    //     return get('api/captcha/sent', parmas)
    // },
    // verify(params) {
    //     return get('/captcha/verify', params)
    // }
    //播放
    getPlayer(params) {
        return get('api/song/url', params)
    },
    //电台分类
    getDjCatetory(params) {
        return get('api/dj/recommend/type', params)
    },
    //获取歌词
    getLRC(params) {
        return get('api/lyric', params)
    },
    //获取搜索接口
    getSearch(params) {
        return get('/api/search', params)
    }
}

export default api