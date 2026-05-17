export type Assignments = {
  id: string;
  topic: string;
  type: string;
  faculty: string;
  department: string;
  annotation: string | null;
  assignmentDate: string;
  taken: boolean;
  student: { id: string; name: string | null } | null;
  supervisor: { id: string; name: string };
};
