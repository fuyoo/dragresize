import {
  ContainerProvider,
  ReferenceLineMap,
  ResizingHandle
} from "./types";
import {ALL_HANDLES} from "./DragResize";
import {ref, Ref} from "vue";

export const IDENTITY = Symbol("DragResize");

export function getElSize(el: Element) {
  const style = window.getComputedStyle(el);
  return {
    width: parseFloat(style.getPropertyValue("width")),
    height: parseFloat(style.getPropertyValue("height"))
  };
}

function createEventListenerFunction(
  type: "addEventListener" | "removeEventListener"
) {
  return <K extends keyof HTMLElementEventMap>(
    el: HTMLElement,
    events: K | K[],
    handler: any
  ) => {
    if (!el) {
      return;
    }
    if (typeof events === "string") {
      events = [events];
    }
    events.forEach((e) => el[type](e, handler, {passive: false}));
  };
}

export const addEvent = createEventListenerFunction("addEventListener");

export const removeEvent = createEventListenerFunction("removeEventListener");

export function filterHandles(handles: ResizingHandle[]) {
  if (handles && handles.length > 0) {
    const result: ResizingHandle[] = [];
    handles.forEach((item) => {
      if (ALL_HANDLES.includes(item) && !result.includes(item)) {
        result.push(item);
      }
    });
    return result;
  } else {
    return [];
  }
}

export function getId() {
  return String(Math.random()).substr(2) + String(Date.now());
}

export function getReferenceLineMap(
  containerProvider: ContainerProvider,
  parentRef: Ref<HTMLElement | undefined>,
  id?: string
) {
  if (containerProvider.disabled.value) {
    return null;
  }
  const referenceLine = {
    row: [] as number[],
    col: [] as number[]
  };

  const parentWidth = parentRef.value?.getBoundingClientRect().width!;
  const parentHeight = parentRef.value?.getBoundingClientRect().height!;
  referenceLine.row.push(...containerProvider.adsorbRows);
  referenceLine.col.push(...containerProvider.adsorbCols);
  if (containerProvider.adsorbParent.value) {
    referenceLine.row.push(0, parentHeight, parentHeight / 2);
    referenceLine.col.push(0, parentWidth, parentWidth / 2);
  }
  const widgetPositionStore = containerProvider.getPositionStore(id);
  Object.values(widgetPositionStore).forEach(({x, y, w, h}) => {
    referenceLine.row.push(y, y + h, y + h / 2);
    referenceLine.col.push(x, x + w, x + w / 2);
  });
  const referenceLineMap: ReferenceLineMap = {
    row: referenceLine.row.reduce((pre, cur) => {
      return {...pre, [cur]: {min: cur - 5, max: cur + 5, value: cur}};
    }, {}),
    col: referenceLine.col.reduce((pre, cur) => {
      return {...pre, [cur]: {min: cur - 5, max: cur + 5, value: cur}};
    }, {})
  };
  return referenceLineMap;
}

export function getParentSize(el: Ref<HTMLElement | undefined>) {
  const parentWidth = ref(0);
  const parentHeight = ref(0);
  console.log(el.value);
  try {
      const dom = window.getComputedStyle(el.value?.parentElement!);
      parentWidth.value = parseFloat(dom.getPropertyValue("width"));
      parentHeight.value = parseFloat(dom.getPropertyValue("height"));
  } catch (e) {

  }
  return {
    parentWidth,
    parentHeight
  };
}
