export type Assignments = {
	id: string;
	faculty: string;
	department: string;
	annotation: string;
	literature: string;
	assignmentDate: string;
	topic: string;
	type: string;
	taken: boolean;
	student: {
		id: string;
		name: string | null;
	};

	supervisor: {
		id: string;
		name: string;
	};
};
