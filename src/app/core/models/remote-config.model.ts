export interface RemoteVersions {
	versions: VersionInfo[];
}

export interface VersionInfo {
	versionNumber: string;
	updateOrigin: string;
	updateType: string;
	updateUser: {
		name?: string;
		email: string;
		imageUrl: string;
	};
	updateTime: string;
}
