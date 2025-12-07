import { player } from './player/config'

const directives = { player }

export const insFunDir = (app) => {
  Object.entries(directives).forEach(([name, directive]) => {
    app.directive(name, directive)
  })
}
