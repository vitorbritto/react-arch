import { useState } from 'react'
import ReactFlow, { Node, Edge, Controls, Background, MarkerType } from 'reactflow'
import { Drawer } from './ui/Drawer'
import 'reactflow/dist/style.css'

const initialNodes: Node[] = [
  {
    id: 'component',
    type: 'default',
    position: { x: 250, y: 0 },
    data: { label: 'React Component' },
    style: { background: '#60a5fa', color: 'white' }
  },
  {
    id: 'state',
    type: 'default',
    position: { x: 100, y: 100 },
    data: { label: 'State' },
    style: { background: '#f87171', color: 'white' }
  },
  {
    id: 'props',
    type: 'default',
    position: { x: 400, y: 100 },
    data: { label: 'Props' },
    style: { background: '#4ade80', color: 'white' }
  },
  {
    id: 'vdom',
    type: 'default',
    position: { x: 250, y: 200 },
    data: { label: 'Virtual DOM' },
    style: { background: '#fbbf24', color: 'white' }
  },
  {
    id: 'reconciliation',
    type: 'default',
    position: { x: 250, y: 300 },
    data: { label: 'Reconciliation' },
    style: { background: '#a78bfa', color: 'white' }
  },
  {
    id: 'dom',
    type: 'default',
    position: { x: 250, y: 400 },
    data: { label: 'DOM' },
    style: { background: '#ec4899', color: 'white' }
  }
]

const initialEdges: Edge[] = [
  {
    id: 'state-component',
    source: 'state',
    target: 'component',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Trigger Re-render',
    style: { stroke: '#f87171' }
  },
  {
    id: 'props-component',
    source: 'props',
    target: 'component',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Parent Updates',
    style: { stroke: '#4ade80' }
  },
  {
    id: 'component-vdom',
    source: 'component',
    target: 'vdom',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Render',
    style: { stroke: '#60a5fa' }
  },
  {
    id: 'vdom-reconciliation',
    source: 'vdom',
    target: 'reconciliation',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Diff',
    style: { stroke: '#fbbf24' }
  },
  {
    id: 'reconciliation-dom',
    source: 'reconciliation',
    target: 'dom',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Update DOM',
    style: { stroke: '#a78bfa' }
  }
]

export const ReactFlowDiagram = () => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNodeClick = (_: any, node: Node) => {
    setSelectedStep(node.id)
  }

  const getStepDescription = (stepId: string) => {
    const descriptions: Record<string, { title: string; content: string[] }> = {
      component: {
        title: 'React Component',
        content: [
          'Can receive props as input',
          'Maintains its own state',
          'Returns React elements for rendering',
          'Can be reused across different parts of the application'
        ]
      },
      state: {
        title: 'State Management',
        content: [
          'Managed through hooks like useState and useReducer',
          'State changes trigger re-rendering',
          'Updates are asynchronous and can be batched for performance',
          'Persists between renders'
        ]
      },
      props: {
        title: 'Props (Properties)',
        content: [
          'Data passed from parent to child components',
          'Read-only (immutable)',
          'Can include data and callbacks',
          'Props changes trigger re-rendering'
        ]
      },
      vdom: {
        title: 'Virtual DOM',
        content: [
          'Lightweight in-memory representation of the real DOM',
          'Enables fast comparison operations',
          'Maintains a snapshot of the desired UI',
          'Syncs with the real DOM when necessary'
        ]
      },
      reconciliation: {
        title: 'Reconciliation Process',
        content: [
          'Compares Virtual DOMs (current and previous)',
          'Identifies minimal necessary changes',
          'Uses heuristics for optimization',
          'Determines efficient DOM updates'
        ]
      },
      dom: {
        title: 'Real DOM',
        content: [
          'Represents the current UI in the browser',
          'Updated efficiently by React',
          'Reflects final state after reconciliation',
          'Direct manipulation is avoided by React'
        ]
      }
    }
    return descriptions[stepId]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 mb-4">
            React: How it works
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            An interactive visualization of React's internal workings, from component
            rendering to DOM updates.
          </p>
        </div>

        <div className="h-[70vh] border rounded-xl shadow-sm bg-white">
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            onNodeClick={handleNodeClick}
            fitView
            className="bg-gradient-to-b from-blue-50/50"
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>

      <Drawer open={selectedStep !== null} onClose={() => setSelectedStep(null)}>
        {selectedStep && (
          <>
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
              {getStepDescription(selectedStep)?.title}
            </h2>
            <div className="prose prose-blue max-w-none">
              <ul className="space-y-2 list-disc pl-4">
                {getStepDescription(selectedStep)?.content.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </Drawer>
    </div>
  )
}
