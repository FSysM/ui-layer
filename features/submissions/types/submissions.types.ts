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
	topic: string;
	status: string;
};
