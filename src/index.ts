import DragResize from './components/DragResize'
import DragResizeContainer from './components/DragResizeContainer'
import { App, Plugin } from 'vue'

DragResize.install = (app: App) => {
  app.component(DragResize.name, DragResize)
  app.component(DragResizeContainer.name, DragResizeContainer)
  return app
}

export { default as DragResizeContainer } from './components/DragResizeContainer'
export default DragResize as typeof DragResize & Plugin
