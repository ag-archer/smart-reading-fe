import { create } from "zustand"

interface ViewerStore {
  currentPage: number
  totalPages: number
  zoom: number
  activeTool: "highlight" | "note" | "comment" | null
  setPage: (page: number) => void
  setZoom: (zoom: number) => void
  setActiveTool: (tool: ViewerStore["activeTool"]) => void
}

export const useViewerStore = create<ViewerStore>((set) => ({
  currentPage: 1,
  totalPages: 0,
  zoom: 1,
  activeTool: null,
  setPage: (page) => set({ currentPage: page }),
  setZoom: (zoom) => set({ zoom }),
  setActiveTool: (tool) => set({ activeTool: tool }),
}))