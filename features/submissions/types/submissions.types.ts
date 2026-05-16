export type Submissions = {
	assignment: {
		topic: string;
		type: string;
		annotation: string;
		student: {
			id: string;
			name: string | null;
		};

		supervisor: {
			id: string;
			name: string;
		};
	};
	opponent: {
		id: string;
		name: string;
	};
	faculty: string;
	department: string;

	literature: string;
	assignmentDate: string;
	status: string;
};

export type SubmissionFormModel = {
	assignmentId: string;

	// Read-only fields (from assignment)
	topic: string;
	type: string;
	faculty: string;
	department: string;
	annotation: string;

	// Editable fields
	literature: string;
	fileUrl: string;
};
