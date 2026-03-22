import { useState } from "react"
import { 
  Home, 
  FileText, 
  Bookmark, 
  Settings,
  ChevronDown,
  ChevronRight,
  Folder,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TreeNode {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeNode[]
  count?: number
  isActive?: boolean
}

export function Sidebar() {
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["my-documents", "environmental-science"])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const treeData: TreeNode[] = [
    {
      id: "my-documents",
      label: "My Documents",
      icon: <FileText className="w-4 h-4" />,
      children: [
        {
          id: "environmental-science",
          label: "Environmental Science",
          icon: <Folder className="w-4 h-4" />,
          children: [
            {
              id: "climate-change",
              label: "Climate Change",
              count: 14
            },
            {
              id: "amazon-studies",
              label: "Amazon Studies",
              isActive: true,
              count: 1
            },
            {
              id: "policy-reviews",
              label: "Policy Reviews"
            }
          ]
        }
      ]
    },
    {
      id: "all-research",
      label: "All Research",
      icon: <FileText className="w-4 h-4" />,
      count: 200
    },
    {
      id: "unassigned",
      label: "Unassigned",
      icon: <FileText className="w-4 h-4" />
    }
  ]

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev =>
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    )
  }

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedNodes.includes(node.id)
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.id}>
        <button
          onClick={() => {
            setSelectedNode(node.id)
            if (hasChildren) {
              toggleNode(node.id)
            }
          }}
          className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm transition-colors ${
            selectedNode === node.id
              ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
              : ""
          } ${node.isActive ? "font-semibold" : ""}`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
        >
          {hasChildren && (
            <span className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
          {!hasChildren && <span className="w-4" />}
          
          {node.icon && <span className="flex-shrink-0">{node.icon}</span>}
          
          <span className="flex-1 text-left truncate">{node.label}</span>
          
          {node.count && (
            <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded flex-shrink-0">
              {node.count}
            </span>
          )}
        </button>

        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Top Navigation Icons */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg"
          title="Home"
        >
          <Home className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg"
          title="Documents"
        >
          <FileText className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg"
          title="Bookmarks"
        >
          <Bookmark className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Topic Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h2 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Topics</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          title="New Topic"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <Input
          placeholder="Search topics..."
          className="h-8 text-sm"
        />
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="px-2 py-3">
          {treeData.map(node => renderTreeNode(node))}
        </div>
      </ScrollArea>

      {/* AI Research Assistant Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-blue-50 dark:bg-blue-950 rounded-lg m-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
            AI
          </div>
          <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            AI Research<br />Assistant
          </h3>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          Ask questions about your documents and get instant insights
        </p>
        <Input
          placeholder="Ask AI Research Assistant..."
          className="h-8 text-xs bg-white dark:bg-gray-900"
        />
      </div>
    </div>
  )
}
