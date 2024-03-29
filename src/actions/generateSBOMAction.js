export const SET_FILE_TYPE = "@sbom/set-file-type"
export const SET_FILE_DETAILS = "@sbom/set-file-details"
export const SET_FILE_LANGUAGE = "@sbom/set-file-language"

export const setSBOMFileType = (details) => {
    return (dispatch) => dispatch({
        type: SET_FILE_TYPE,
        payload: {
            details
        }
    })
};

export const setSBOMFileDetails = (details) => {
    return (dispatch) => dispatch({
        type: SET_FILE_DETAILS,
        payload: {
            details
        }
    })
};

export const setSBOMFileLanguage = (details) => {
    return (dispatch) => dispatch({
        type: SET_FILE_LANGUAGE,
        payload: {
            details
        }
    })
};