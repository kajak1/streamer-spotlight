export interface VoteRepository {
	findAll: () => Promise<any[]>;
	findUnique: (args: any) => Promise<any | null>;
	insert: (args: any) => Promise<any>;
	delete: (args: any) => Promise<any>;
}
