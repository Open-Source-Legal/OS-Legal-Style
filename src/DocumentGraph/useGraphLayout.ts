import { useMemo } from 'react';
import type { GraphNodeData, GraphEdgeData, GraphLayout, Position } from '../types/relationship';

interface LayoutOptions {
  width: number;
  height: number;
  layout: GraphLayout;
  focusNodeId?: string;
}

interface LayoutResult {
  nodes: (GraphNodeData & { position: Position })[];
  edges: GraphEdgeData[];
}

/**
 * Calculate node positions based on layout algorithm.
 *
 * Force layout: Radial arrangement from focus node
 * Hierarchical layout: Tree structure with focus at top
 */
export function useGraphLayout(
  nodes: GraphNodeData[],
  edges: GraphEdgeData[],
  options: LayoutOptions
): LayoutResult {
  const { width, height, layout, focusNodeId } = options;

  return useMemo(() => {
    if (nodes.length === 0) {
      return { nodes: [], edges };
    }

    const centerX = width / 2;
    const centerY = height / 2;
    const padding = 80;

    // Find focus node or use first node
    const focusNode = nodes.find((n) => n.id === focusNodeId) || nodes[0];

    // Group nodes by depth
    const nodesByDepth = new Map<number, GraphNodeData[]>();
    nodes.forEach((node) => {
      const depth = node.depth ?? (node.id === focusNode.id ? 0 : 1);
      if (!nodesByDepth.has(depth)) {
        nodesByDepth.set(depth, []);
      }
      nodesByDepth.get(depth)!.push(node);
    });

    const positionedNodes: (GraphNodeData & { position: Position })[] = [];

    if (layout === 'force') {
      // Radial layout from center
      nodesByDepth.forEach((depthNodes, depth) => {
        if (depth === 0) {
          // Focus node at center
          depthNodes.forEach((node) => {
            positionedNodes.push({
              ...node,
              position: { x: centerX, y: centerY },
            });
          });
        } else {
          // Other nodes in concentric circles
          const radius = Math.min(width, height) / 2 - padding - (depth - 1) * 60;
          const angleStep = (2 * Math.PI) / depthNodes.length;
          const startAngle = -Math.PI / 2; // Start from top

          depthNodes.forEach((node, i) => {
            const angle = startAngle + i * angleStep;
            positionedNodes.push({
              ...node,
              position: {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
              },
            });
          });
        }
      });
    } else {
      // Hierarchical layout (top-down tree)
      const levelHeight = (height - padding * 2) / Math.max(nodesByDepth.size, 1);

      nodesByDepth.forEach((depthNodes, depth) => {
        const levelWidth = width - padding * 2;
        const nodeSpacing = levelWidth / (depthNodes.length + 1);
        const y = padding + depth * levelHeight + levelHeight / 2;

        depthNodes.forEach((node, i) => {
          positionedNodes.push({
            ...node,
            position: {
              x: padding + (i + 1) * nodeSpacing,
              y,
            },
          });
        });
      });
    }

    return { nodes: positionedNodes, edges };
  }, [nodes, edges, width, height, layout, focusNodeId]);
}
