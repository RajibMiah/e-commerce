import React, {FC, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {CardMedia, Grid, Box, Fab, TextField, Button, CardActionArea} from "@material-ui/core";
import {FiCamera} from 'react-icons/fi'
import {Rating} from "@material-ui/lab";
import MuiAlert from 'components/meterial-ui/alert-message/MuiAlert';
import {mutate} from "swr";
import {useSelector} from "react-redux";
import {AuthState} from "redux/auth/reducer";
import {MdDeleteForever} from "react-icons/md";

const useStyles = makeStyles(theme => ({
    root: {
        display:'flex',
        width: '95%',
        margin: "0 auto",
        [theme.breakpoints.down('sm')]: {},
        [theme.breakpoints.up('md')]: {},
        [theme.breakpoints.up('lg')]: {},
    },
    ratingBox: {

        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            border: '1px solid',
            width: '90%',
            borderStyle: 'dashed',
            // margin: '0 auto',
            cursor: 'pointer',
            margin: "17px"
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            border: '1px solid',
            width: '30%',
            borderStyle: 'dashed',
            margin: '0 auto',
            cursor: 'pointer',
        },
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            border: '1px solid',
            width: '21%',
            borderStyle: 'dashed',
            margin: '0 auto',
            cursor: 'pointer',
        },
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    heading: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '9px',
            //flexShrink: 0,
            color: theme.palette.text.secondary,
        },
        [theme.breakpoints.up('md')]: {},
        [theme.breakpoints.up('lg')]: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
    },
    secondaryHeading: {

        [theme.breakpoints.down('sm')]: {
            textAlign: "end",
            fontSize: theme.typography.pxToRem(10),
            color: theme.palette.text.secondary,
        },
        [theme.breakpoints.up('md')]: {},
        [theme.breakpoints.up('lg')]: {
            textAlign: "center",
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    },

    containerTitle: {
        [theme.breakpoints.down('sm')]: {
            margin: "7px",
            textAlign: 'end',
            color: 'red'
        },
        [theme.breakpoints.up('md')]: {
            margin: "30px",
            textAlign: 'end',
            color: 'red'
        },
        [theme.breakpoints.up('lg')]: {
            margin: "20px",
            textAlign: 'end',
            color: 'red'
        },
    },
    deleteIcon: {
        background: '#00000080',
        borderRadius: '6px',
        position: 'absolute',
        fontSize: '20px',
        color: 'white',
        right: '3px',
        top: '9px',
    },
    image: {
        height: '8rem',
        margin: '0 auto',
        borderRadius: '12px'
    },
    accordionSummary: {
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
    },
    cardArea: {},

}));

type ReviewProps = {
    data: any;
}

type RootState = {
    auth: AuthState;
}


const SubmitReview: FC<ReviewProps> = ({data}) => {
    const classes = useStyles();
    const {results} = data
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const {access_token} = useSelector((state: RootState) => state.auth);
    const [showAlert, setShowAlert] = useState({isOpen: false, msg: '', type: ''})
    const [formData, setFormData] = React.useState([])
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleUploadClick = async (e, index) => {
        // let { files } = e.target;
        //
        // let formData = new FormData();
        // _.forEach(files, file => {
        //     formData.append('files', file);
        // });
        //
        // setUploding(true);
        // let { data } = await API.post(uploadUrl, formData, {
        //     onUploadProgress: ({ loaded, total }) => {
        //         let progress = ((loaded / total) * 100).toFixed(2);
        //         setProgress(progress);
        //     }
        // });
        // setUplodedImgs(data);
        // setUploding(false);
        e.preventDefault();
        const filesList = e.target.files;
        if (filesList.length === 0 ) return;
        //Spread array to current state preview URLs
        let arr = [...formData[index].images];
        for (let i = 0; i < filesList.length; i++) {
            const file = filesList[i];
            const reader = new FileReader();
            reader.onload = upload => {
                //push new image to the end of arr
                arr.push(upload.target.result);
                //Set state to arr
                let newArray = [...formData]
                newArray[index].images = arr
                setFormData(newArray)
            };
            reader.readAsDataURL(file);
        }
    }

    const removeImageLink = (rowIndex, targetIndex) => {
        let filteredImage = formData[rowIndex].images.filter((value, index) => index !== targetIndex)
        let newArray = [...formData]
        newArray[rowIndex].images = filteredImage
        setFormData(newArray)
    }

    const handleTextChange = (event, index) => {
        let newArray = [...formData]
        newArray[index].message = event.target.value
        setFormData(newArray)
    };

    const handleRating = (event, newValue, id, index) => {
        let newArray = [...formData]
        newArray[id].rating = newValue
        setFormData(newArray)
    }
    const handleSubmit = async (index, variantId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/product/v1/reviews/`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Token ${access_token}`,
                },
                method: 'POST',
                body: JSON.stringify({...formData[index], variant: variantId})
            })
            if (response.ok) {
                setShowAlert({
                    ...showAlert,
                    isOpen: true,
                    msg: 'successful',
                    type: 'success'
                })

                mutate(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/product/v1/reviews/`).then()
            }
        } catch (error) {
            setShowAlert({
                ...showAlert,
                isOpen: true,
                msg: error,
                type: 'error'
            })
        }
    }

    const handleUpdate = async (index, itemId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/product/v1/reviews/${itemId}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Token ${access_token}`,
                },
                method: 'PUT',
                body: JSON.stringify({
                    rating: formData[index].rating,
                    message: formData[index].message,
                    images: formData[index].images,
                    removed_images: [],//formData[index].removed_images
                })
            })
            if (response.ok) {
                setShowAlert({
                    ...showAlert,
                    isOpen: true,
                    msg: 'update successful',
                    type: 'success'
                })
                mutate(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/product/v1/reviews/`).then()
            }
        } catch (error) {
            setShowAlert({
                ...showAlert,
                isOpen: true,
                msg: error,
                type: 'error'
            })
        }
    }

    useEffect(() => {
        results?.map(({review}) => {
            review ? setFormData(
                prev => [...prev, {
                    rating: review.rating,
                    images: review.images,
                    message: review.message,
                    variant: review.variant
                }])
                :
                setFormData(
                    prev => [...prev, {
                        rating: 4,
                        images: [],
                        message: '',
                        variant: 0
                    }])
        })
    }, [data])

    return <Grid container  className={classes.root}>
        {
            results?.map((item, index) => {
                const {review} = item
                let id = index
                return (
                    <Grid container item style={{marginBottom: '13px'}} key={index}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                className={classes.containerTitle}
                            >
                                {review ? "Update review" : "Review"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Accordion expanded={expanded === `panel${index + 1}`}
                                       onChange={handleChange(`panel${index + 1}`)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    className={classes.accordionSummary}
                                >
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <CardMedia
                                                className={classes.media}
                                                image={item.images[0].thumbnail}
                                                title={item.images[0].alt}
                                            />
                                        </Grid>
                                        <Grid item xs container>
                                            <Grid item xs={12}>
                                                <Typography variant='subtitle2' className={classes.heading}>
                                                    {item.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    component='span'
                                                    className={classes.secondaryHeading}
                                                >
                                                    {item.measurement}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography
                                                className={classes.secondaryHeading}
                                            >
                                                Delivered
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container justify={'center'}>
                                        <Grid item xs={12} style={{textAlign: 'center', margin: "13px"}}>
                                            <Rating
                                                readOnly = {false}
                                                name={`simple-controlled-${index}`}
                                                key = {id}
                                                value={formData[id]?.rating || 4}
                                                onChange={(event, newValue) => handleRating(event, newValue, id, index)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}
                                              style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Box className={classes.ratingBox}>
                                                <input
                                                    key = {index}
                                                    accept="image/*"
                                                    id= {`contained-button-file-${index}`}
                                                    multiple
                                                    type="file"
                                                    hidden
                                                    onChange={(e) => handleUploadClick(e, index)}
                                                />
                                                <label htmlFor={`contained-button-file-${index}`}>
                                                    <Box style={{cursor: 'pointer'}}>
                                                    <span style={{padding: "7px"}}>
                                                       <FiCamera/>
                                                    </span>
                                                        <span>
                                                          Upload Photo
                                                        </span>
                                                    </Box>
                                                </label>
                                            </Box>
                                        </Grid>
                                        {
                                            formData[index]?.images.length > 0 ?
                                                <Grid
                                                    item
                                                    container
                                                    spacing={2}
                                                    justify='center'
                                                    style={{margin: '17px'}}>
                                                    {
                                                        formData[index]?.images.map((image, imgIndex) => {
                                                            return (
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    sm={6}
                                                                    md={4}
                                                                    lg={4}
                                                                    key={index}

                                                                >
                                                                    {/* <h6> {value.imageLink} </h6> */}
                                                                    <CardActionArea className={classes.cardArea}>
                                                                        <div>
                                                                            <MdDeleteForever
                                                                                className={classes.deleteIcon}
                                                                                onClick={() => removeImageLink(index, imgIndex)}
                                                                            />
                                                                        </div>

                                                                        <CardMedia
                                                                            className={classes.image}
                                                                            image={image}
                                                                            title="Contemplative Reptile"
                                                                        />
                                                                    </CardActionArea>
                                                                </Grid>
                                                            )
                                                        })
                                                    }
                                                </Grid>
                                                :
                                                null
                                        }

                                        <Grid item xs={12}>
                                            <Box
                                                component='div'
                                                style={{
                                                    textAlign: 'center',
                                                    margin: '17px'
                                                }}
                                            >
                                                <TextField
                                                    id="outlined-multiline-flexible"
                                                    multiline
                                                    variant="outlined"
                                                    rows={3}
                                                    value={formData[index]?.message}
                                                    placeholder='Do not Shy, tell us more '
                                                    onChange={(event) => handleTextChange(event, index)}
                                                    style={{
                                                        width: '100%'
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} style={{textAlign: 'center'}}>
                                            <Button
                                                variant="contained"
                                                color='primary'
                                                style={{
                                                    minWidth: "25%"
                                                }}
                                                onClick={
                                                    review ?
                                                        () => handleUpdate(index, review.id)
                                                        :
                                                        () => handleSubmit(index, item.id)
                                                }

                                            >
                                                < Typography
                                                    variant='subtitle2'
                                                    color='textPrimary'
                                                >
                                                    Submit
                                                </Typography>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                )
            })
        }
        <MuiAlert
            showAlert = {showAlert}
            setOpen = {setShowAlert}
        />

    </Grid>
}
export default SubmitReview