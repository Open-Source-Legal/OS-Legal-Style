/**
 * Relationship types for document graph visualization.
 * Maps to backend DocumentRelationship and AnnotationLabel models.
 */

/** Relationship label from backend AnnotationLabel */
export interface RelationshipLabel {
  id: string;
  text: string;
  color: string;
  icon?: string;
  description?: string;
}

/** Source of the relationship */
export type RelationshipSource = 'manual' | 'analyzer' | 'imported';

/** Document relationship from backend DocumentRelationship */
export interface DocumentRelationship {
  id: string;
  sourceDocumentId: string;
  targetDocumentId: string;
  label: RelationshipLabel;
  source: RelationshipSource;
  analyzerId?: string;
  analysisId?: string;
  creatorId?: string;
  createdAt?: string;
}

/** Minimal document info for graph nodes */
export interface GraphDocument {
  id: string;
  title: string;
  documentType?: 'pdf' | 'docx' | 'txt' | 'legislation' | 'case' | 'contract';
  icon?: string;
  relationshipCount?: number;
}

/** Position in 2D space for graph layout */
export interface Position {
  x: number;
  y: number;
}

/** Graph node with position and state */
export interface GraphNodeData extends GraphDocument {
  position?: Position;
  depth?: number; // Distance from focus node (0 = focus, 1 = direct connection, 2 = 2 hops)
  isExpanded?: boolean; // Whether this node's connections are loaded
  canExpand?: boolean; // Whether more connections exist beyond loaded
}

/** Graph edge with relationship data */
export interface GraphEdgeData {
  id: string;
  source: string; // Document ID
  target: string; // Document ID
  relationship: DocumentRelationship;
}

/** Graph data for visualization */
export interface GraphData {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  focusNodeId?: string;
  maxDepthLoaded: number;
  hasMore: boolean;
}

/** Layout algorithm options */
export type GraphLayout = 'force' | 'hierarchical';

/** Filter options for graph */
export interface GraphFilters {
  relationshipTypes?: string[]; // Filter by label IDs
  sources?: RelationshipSource[];
  maxDepth?: number;
}
