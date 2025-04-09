// auth queries
export const authApiNewPasswordMutation = {
	baseKey: 'new password'
}

export const authApiResetPasswordMutation = {
	baseKey: 'reset password'
}

export const authApiOAuthByProvider = {
	baseKey: 'oauth by provider'
}

export const authApiSigninMutation = {
	baseKey: 'signin user'
}

export const authApiSignupMutation = {
	baseKey: 'signup user'
}

export const authApiVerification = {
	baseKey: 'new verification'
}
// user queries
export const userApiQuery = {
	baseKey: 'profile'
}

//user mutation
export const userApiLogoutMutation = {
	baseKey: 'logout'
}
export const userApiUpdateMutation = {
	baseKey: 'update profile'
}

//document queries
export const documentsDefaultApiQuery = {
	baseKey: 'default'
}
//document queries favorites
export const documentsFavoritesApiQuery = {
	baseKey: 'favorites'
}
export const documentsFavoritedApiQuery = {
	baseKey: 'favorited'
}
//document queries archive
export const documentsArchiveApiQuery = {
	baseKey: 'archive'
}
export const documentsArchivedApiQuery = {
	baseKey: 'archived'
}
//document queries document & documents
export const documentsApiQuery = {
	baseKey: 'documents'
}
export const documentMenuApiQuery = {
	baseKey: 'documents menu'
}
export const documentsSharedApiQuery = {
	baseKey: 'documents shared'
}
export const documentsLastVisitedApiQuery = {
	baseKey: 'documents lastvisited'
}
export const documentApiQuery = {
	baseKey: 'document'
}
//document queries column
export const columnApiQuery = {
	baseKey: 'column'
}
export const columnSharedApiQuery = {
	baseKey: 'column'
}

//document queries column
export const tagApiQuery = {
	baseKey: 'tag'
}

//mutation tag
export const tagApiCreateMutation = {
	baseKey: 'tag create'
}

export const tagApiUpdateMutation = {
	baseKey: 'tag update'
}

export const tagSelectedApiUpdateMutation = {
	baseKey: 'tag update selected'
}

export const tagApiDeleteMutation = {
	baseKey: 'tag delete'
}

//mutation document
export const documentApiCreateMutation = {
	baseKey: 'document create'
}

export const documentApiUpdateMutation = {
	baseKey: 'document update'
}

export const docColOrderApiUpdateMutation = {
	baseKey: 'document column order update'
}

export const documentApiDeleteMutation = {
	baseKey: 'document delete'
}

//mutation column
export const columnApiCreateMutation = {
	baseKey: 'column create'
}

export const columnApiUpdateMutation = {
	baseKey: 'column update'
}

export const columnApiDeleteMutation = {
	baseKey: 'column delete'
}
