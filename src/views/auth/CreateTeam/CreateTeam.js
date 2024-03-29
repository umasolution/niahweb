import React, { useEffect, useState } from 'react'
import {
    Box,
    TextField,
    Typography
} from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import Axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router';


export default function CreateTeam() {

    const history = useHistory()

    const [companyName, setCompanyName] = useState('')
    const [companyId, setCompanyId] = useState('')

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const url = "org/details";
            const response = await Axios.get(url);
            if (response.data[0].companyname) {
                setCompanyName(response.data[0].companyname)
                setCompanyId(response.data[0].company_id)
            }
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    };


    const signUpSchema = Yup.object().shape({
        companyId: Yup.string().max(255).required('Company Id is required'),
        teamName: Yup.string().max(255).required('Team name is required'),
    })
    const postData = async (values) => {
     
        try {
            const response = await Axios.post('/team/register',
                {
                    company_id : companyId,
                    team_name: values.teamName
                }
            )
            const url = "org/details";
            const getResponse = await Axios.get(url);
            if(getResponse.data[0].teams.length > 0){
               history.push('/create-admin-user');
               }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Formik
            initialValues={{
                companyname : companyName,
                teamName: '',
            }}
            validationSchema={signUpSchema}

            onSubmit={(values) => postData(values)}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
            }) => (
                <form
                    onSubmit={handleSubmit}
                >
                    <div className='main-div' style={{ width: "100%" }}>
                        <div className='content-div'>
                            <Typography variant="h2" gutterBottom className='title'>
                                Create Team
                            </Typography>
                            <TextField
                                fullWidth
                                label="Company Name"
                                margin="normal"
                                name="companyname"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="companyname"
                                value={companyName}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(touched.teamName && errors.teamName)}
                                fullWidth
                                helperText={touched.teamName && errors.teamName}
                                label="Team Name"
                                margin="normal"
                                name="teamName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="teamName"
                                value={values.teamName}
                                variant="outlined"
                            />

                            <Box mt={2}>
                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={() => postData(values)}
                                >
                                    Create Team
                                </LoadingButton>
                            </Box>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}