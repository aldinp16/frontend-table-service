import AuthRepository from "./authRepository"
import OrderRepository from './orderRepository'
import MenuRepository from './menuRepository'
import userRepository from './userRepository'
import metricRepository from './metricRepository'

const repositories = {
  auth: AuthRepository,
  order: OrderRepository,
  menu: MenuRepository,
  user: userRepository,
  metric: metricRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
