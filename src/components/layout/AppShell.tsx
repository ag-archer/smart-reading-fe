import { ResizablePanelGroup, ResizablePanel, ResizableHandle } 
  from "@/components/ui/resizable"
import { Sidebar } from "@/components/sidebar/Sidebar"
import { PdfViewer } from "@/components/pdf-viewer/PdfViewer"
import { AiPanel } from "@/components/ai-assistant/AiPanel"

export function AppShell() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="h-screen w-screen">
      <ResizablePanel defaultSize={20}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={55}>
        <PdfViewer />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25}>
        <AiPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}