import VueDraggableResizable from './components/DragResize'
import DraggableContainer from './components/DragResizeContainer'
import { App, Plugin } from 'vue'

VueDraggableResizable.install = (app: App) => {
  app.component(VueDraggableResizable.name, VueDraggableResizable)
  app.component(DraggableContainer.name, DraggableContainer)
  return app
}

export { default as DraggableContainer } from './components/DragResizeContainer'
export default VueDraggableResizable as typeof VueDraggableResizable & Plugin
