import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Highlighter,
  Bookmark,
  MessageSquare,
  Search,
  Settings2
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function PdfViewer() {
  const [currentPage, setCurrentPage] = useState(14)
  const [totalPages] = useState(98)
  const [zoom, setZoom] = useState(100)

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50))
  }

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 border-l border-r border-gray-200 dark:border-gray-700 px-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            title="Zoom out"
          >
            <ZoomOut className="w-5 h-5" />
          </Button>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-center">
            {zoom}%
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            title="Zoom in"
          >
            <ZoomIn className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            title="Highlight"
            className="text-yellow-600 dark:text-yellow-500"
          >
            <Highlighter className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            title="Add note"
          >
            <MessageSquare className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            title="Bookmark"
          >
            <Bookmark className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            title="More options"
          >
            <Settings2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* PDF Content Area */}
      <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
        <div
          className="bg-white dark:bg-gray-800 shadow-lg rounded"
          style={{
            width: `${650 * (zoom / 100)}px`,
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center"
          }}
        >
          {/* Mock PDF Page */}
          <div className="p-8 pb-12 border border-gray-300 dark:border-gray-600">
            <div className="space-y-4">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Figure 1. Global Biodiversity Decline: Causes and Impacts in Amazon Basin
                </h2>
                <img
                  alt="PDF content"
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23e5e7eb' width='400' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='14'%3EPDF Content Preview%3C/text%3E%3C/svg%3E"
                  className="w-full rounded mb-4"
                />
              </div>

              {/* Text content */}
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  The rapid loss of primary forests in the Amazon Basin (estimated at 1.8 million hectares annually) has significantly accelerated species extinction rates, particularly affecting endemic birds and primates.
                </p>
                <p className="font-semibold text-yellow-100 bg-yellow-600 bg-opacity-20 p-2 rounded">
                  "The rapid loss of primary forests in the Amazon Basin, endemic species extinction rates, particularly affecting endemic birds and primates."
                </p>
                <p>
                  Global Biodiversity Decline: Causes and Impacts provides comprehensive data on accelerated species extinction rates, particularly affecting endemic species and communities.
                </p>
              </div>

              {/* Page number */}
              <div className="pt-12 text-center text-xs text-gray-500 dark:text-gray-400">
                Page {currentPage}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
