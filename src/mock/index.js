import Mock from 'mockjs'
import login from './user'

// requestObject: {reqKey:"xxx",reqFrom:"xxx",reqData:params}
// responseObject: {resCode:"000",resDesc:"Success",resData:data}

// authorization 授权API相关
// reqKey: login,
Mock.mock(/\/auth/, 'post', login.authorization)
