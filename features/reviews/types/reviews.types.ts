export type Reviews = {
	grade: string;
	type: string;
	submission: {
		assignment: {
			topic: string;
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
	};
};
