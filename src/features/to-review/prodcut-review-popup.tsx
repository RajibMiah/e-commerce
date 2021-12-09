import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {
    Button,
    CardActionArea,
    CardMedia, Divider,
    FormControl,
    Grid,
    Input,
    Typography
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Rating} from "@material-ui/lab";
import {GrGallery} from 'react-icons/gr'
import {useSelector} from "react-redux";
import {AuthState} from "redux/auth/reducer";
import MuiAlert from "components/meterial-ui/alert-message/MuiAlert";
import {MdDeleteForever} from "react-icons/md";
import {mutate} from "swr";
import LinearLoader from "components/meterial-ui/liner-loader/LinearLoader";

type Theme = {
    palette: {
        default: {
            main
        }
    },
    breakpoints: any
}

const useStyles = makeStyles((theme: Theme) => {
    return ({
        root: {},
        media: {
            height: "2.5rem"
        },
        textField: {
            width: '100%',
            border: `1px solid #BBCAD9`,
            borderRadius: '5px',
            '& .MuiInputBase-inputMultiline': {
                paddingTop: "9px"
            },
            '& .MuiInputBase-root': {
                height: "6rem",
                padding: "13px",
                '&::before': {
                    borderBottom: "none !important"
                }
            },
            '& .MuiIconButton-root': {
                position: 'relative',
                top: "1.8rem",
                opacity: "0.5",
                left: "1.1rem"
            },
            [theme.breakpoints.down('sm')]: {
                '& .MuiInputBase-input': {
                    fontSize: '0.78rem !important'
                }
            }
        },
        image: {
            width: "2.5rem",
            height: '2.5rem',
            margin: '0 auto',
        },
        content: {
            width: 'auto',
            minWidth: '24%',
            display: 'grid',
            alignItems: 'center',
            marginLeft: "9px",
            [theme.breakpoints.down('sm')]: {
                maxWidth: '42%',
                '& .MuiTypography-subtitle1': {
                    fontSize: '0.7rem'
                },
                '& .MuiRating-root': {
                    fontSize: '1rem'
                },
                '& .MuiInputBase-input': {
                    fontSize: '0.78rem !important'
                }
            }
            ,
        },
        updated_image: {
            marginRight: "13px",
            fontSize: "2rem"
        },
        btnStyle: {
            display: 'grid',
            alignItems: 'center',
            padding: '5px',
            "& .MuiButton-contained": {
                [theme.breakpoints.down('sm')]: {
                    fontSize: 'smaller'
                },
            }
        },
        deleteIcon: {
            background: '#00000080',
            display: 'flex',
            position: 'absolute',
            fontSize: '13px',
            color: 'white',
            right: '0px',
            top: '0px',
        },
        cardArea: {},
    });
})

interface Props {
    items: any,
    mutate: any
    onCloseBtnClick: any
}

interface ItemsProps {
    quantity,
    variant: {
        id: number,
        images: any,
        title: string,
        rating: number,
        review?: {
            id: number,
            message: string,
            images: any,
            rating: number,
            variant: number
        },
    }
}

type RootState = {
    auth: AuthState;
}

interface Review {
    variant: {
        id: number,
        images: any,
        title: string,
        rating: number,
        review?: {
            id: number,
            message: string,
            images: any,
        },
    }


}


const ProductReviewPopup: React.FC<Props> = ({items, onCloseBtnClick}) => {
    const classes = useStyles()
    const {access_token} = useSelector((state: RootState) => state.auth);
    const [showAlert, setShowAlert] = useState({isOpen: false, msg: '', type: ''})
    const [formDataPreview, setFormDataPreview] = React.useState([])

    const handleUploadClick = async (e, index) => {
        e.preventDefault();
        const filesList = e.target.files;
        let limitFiles = Math.abs(filesList.length + formDataPreview[index].images.length)
        if (filesList.length !== 0 && filesList.length <= 5 && limitFiles <= 5 && formDataPreview[index].images.length <= 5) {
            let arr = [...formDataPreview[index].images];
            for (let i = 0; i < filesList.length; i++) {
                if (parseInt((filesList[i].size / (1024 * 1024)).toFixed(2)) < 5) {
                    const file = filesList[i];
                    const reader = new FileReader();
                    reader.onload = upload => {

                        //NOTE::PUSH NEW IMAGE TO THE END OF ARRAY
                        arr.push({image: upload.target.result});

                        //NOTE:: SET STATE TO AN ARRAY
                        let newArray = [...formDataPreview]
                        newArray[index].images = arr
                        newArray[index].formImage.push(file)
                        newArray[index].isCancelBtnVisible = true
                        e.target.value = null;
                        setFormDataPreview(newArray)
                    }
                    reader.readAsDataURL(file);
                } else {
                    setShowAlert({
                        ...showAlert,
                        isOpen: true,
                        msg: `${filesList[i].name} is image size is too big.  Please choose low  size image.`,
                        type: 'warning'
                    })
                }
            }
        } else {
            filesList.length === 0 ? setShowAlert({
                    ...showAlert,
                    isOpen: true,
                    msg: 'Please add some image',
                    type: 'warning'
                })
                :
                setShowAlert({
                    ...showAlert,
                    isOpen: true,
                    msg: 'Max five image are allowed',
                    type: 'warning'
                })
            e.target.value = null;
        }
    }
    const removeImageLink = (rowIndex, targetIndex) => {
        let filteredImage = formDataPreview[rowIndex].images.filter((value, index) => index !== targetIndex)
        let removedImageUrls = formDataPreview[rowIndex].images.find((value, index) => index === targetIndex && value.id)
        let newArray = [...formDataPreview]
        newArray[rowIndex].images = filteredImage
        newArray[rowIndex].isCancelBtnVisible = true
        setFormDataPreview(prev => [...prev, newArray])
        setFormDataPreview(prev => [...prev, formDataPreview[rowIndex].removeImageUrl.push(removedImageUrls)])
    }

    const handleTextChange = (event, index) => {
        let newArray = [...formDataPreview]
        newArray[index].message = event.target.value
        newArray[index].isCancelBtnVisible = true
        setFormDataPreview(newArray)
    };

    const handleRating = (event, newValue, id, index) => {
        let newArray = [...formDataPreview]
        newArray[id].rating = newValue
        newArray[id].isCancelBtnVisible = true
        setFormDataPreview(newArray)
    }
    const handleSubmit = async (index, variantId) => {
        const formData = new FormData()
        setFormDataPreview(prev => [...prev, prev[index].isCancelBtnVisible = false])
        setFormDataPreview(prev => [...prev, prev[index].isLoading = true])
        formData.append('rating', formDataPreview[index].rating)
        formData.append('message', formDataPreview[index].message)
        formData.append('removed_images', '[]')
        formData.append('variant', variantId)
        formDataPreview[index].formImage.map((file) => {
            formData.append('image_files', file)
        })
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/product/v1/reviews/`, {
                headers: {
                    "Authorization": `Token ${access_token}`,
                },
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                setFormDataPreview(prev => [...prev, prev[index].isLoading = false])
                setFormDataPreview(
                    prev => [...prev,
                        prev[index].isCancelBtnVisible = false
                    ])
                setShowAlert({
                    ...showAlert,
                    isOpen: true,
                    msg: `${items[index]?.variant.title} review successful`,
                    type: 'success'
                })
                mutate(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/product/v1/reviews/`).then()
            }
            if (!response.ok) {
                setFormDataPreview(prev => [...prev, prev[index].isLoading = false])
                setFormDataPreview(prev => [...prev, prev[index].isCancelBtnVisible = true])
                if (isNaN(parseInt(formDataPreview[index].rating))) {
                    setShowAlert({
                        ...showAlert,
                        isOpen: true,
                        msg: "Rating is required",
                        type: 'error'
                    })
                } else {
                    setShowAlert({
                        ...showAlert,
                        isOpen: true,
                        msg: "Something is wrong.",
                        type: 'error'
                    })
                }

            }
        } catch (error) {
            setFormDataPreview(prev => [...prev, prev[index].isLoading = false])
            setFormDataPreview(prev => [...prev, prev[index].isCancelBtnVisible = true])
            setShowAlert({
                ...showAlert,
                isOpen: true,
                msg: error,
                type: 'error'
            })
        }
    }

    const handleUpdate = async (index, itemId) => {
        const formData = new FormData()
        setFormDataPreview(prev => [...prev, prev[index].isCancelBtnVisible = false])
        setFormDataPreview(prev => [...prev, prev[index].isLoading = true])
        formData.append('rating', formDataPreview[index].rating)
        formData.append('message', formDataPreview[index].message)
        formDataPreview[index].formImage.map((file) => {
            formData.append('image_files', file)
        })
        formDataPreview[index].removeImageUrl ? formDataPreview[index].removeImageUrl.map((value: { id }) => {
            value !== undefined && formData.append('removed_images', value.id)
        }) : formData.append('removed_images', '[]')

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/product/v1/reviews/${itemId}/`, {
                headers: {
                    "Authorization": `Token ${access_token}`,
                },
                method: 'PUT',
                body: formData
            })
            if (response.ok) {
                setFormDataPreview(prev => [...prev, prev[index].isLoading = false])
                setFormDataPreview(
                    prev => [...prev,
                        prev[index].isCancelBtnVisible = false
                    ])
                setShowAlert({
                    ...showAlert,
                    isOpen: true,
                    msg: `${items[index]?.variant.title} review update successful`,
                    type: 'success'
                })
                mutate(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/product/v1/reviews/`).then()
            }
            if (!response.ok) {
                setFormDataPreview(prev => [...prev, prev[index].isLoading = false])
                setFormDataPreview(prev => [...prev, prev[index].isCancelBtnVisible = true])
                if (isNaN(parseInt(formDataPreview[index].rating))) {
                    setShowAlert({
                        ...showAlert,
                        isOpen: true,
                        msg: "Rating is required",
                        type: 'error'
                    })
                } else {
                    setShowAlert({
                        ...showAlert,
                        isOpen: true,
                        msg: "Something is wrong.",
                        type: 'error'
                    })
                }
            }
        } catch (error) {
            setFormDataPreview(prev => [...prev, prev[index].isLoading = false])
            setFormDataPreview(prev => [...prev, prev[index].isCancelBtnVisible = true])
            setShowAlert({
                ...showAlert,
                isOpen: true,
                msg: error,
                type: 'error'
            })
        }
    }

    const onClickCancel = (index) => {
        setFormDataPreview(
            prev => [...prev,
                prev[index].rating = items[index].variant.review.rating || 0,
                prev[index].images = items[index].variant.review.images || [],
                prev[index].message = items[index].variant.review.message || '',
                prev[index].variant = items[index].variant.review.variant || 0,
                prev[index].formImage = [],
                prev[index].isCancelBtnVisible = false,
                prev[index].removeImageUrl = []
            ])
    }

    useEffect(() => {

        /* NOTE:: INITIALLY LOAD THE FETCH DATA INTO FROM_DATE_PREVIEW IF THE USER ALREADY GIVE THERE FEEDBACK FOR A SPECIFIC PRODUCT
         IF THE REVIEW OBJECT IS NULL THEN WE CAN SURE  THAT USER HAVE NOT REVIEWED AT A SPECIFIC PRODUCT  */

        items?.map((item: ItemsProps, index) => {
            if (item.quantity !== 0) {
                item.variant.review ? setFormDataPreview(
                    prev => [...prev, {
                        rating: item.variant.review.rating,
                        images: item.variant.review.images,
                        message: item.variant.review.message,
                        variant: item.variant.review.variant,
                        formImage: [],
                        isCancelBtnVisible: false,
                        isLoading: false,
                        removeImageUrl: []
                    }])
                    :
                    setFormDataPreview(
                        prev => [...prev, {
                            rating: 0,
                            images: [],
                            message: '',
                            variant: 0,
                            formImage: [],
                            isCancelBtnVisible: false,
                            isLoading: false,
                            removeImageUrl: []
                        }])
            }
        })

    }, [items])

    if (!formDataPreview.length) return <h6>loading...</h6>
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography
                    variant='body1'
                    style={{
                        fontWeight: "bold",
                        padding: '2rem',
                        textAlign: "center"
                    }}
                >
                    Would you please tell us about your last delivery product?
                </Typography>
                <Divider/>
            </Grid>
            <Grid item container style={{padding: "1rem"}}>
                {
                    items.map((item: Review, index) => {
                        return (
                            <Grid key={index} item xs={12}>
                                <Grid item container>
                                    <div style={{
                                        display: 'flex',
                                        cursor: 'pointer'
                                    }}
                                        // onClick={() => Router.push(`/product/${items[index].variant.id}`)}
                                    >
                                        <div style={{
                                            fontSize: "2.5rem",
                                            width: "3.5rem",
                                            padding: "7px",
                                        }}
                                        >
                                            <CardMedia
                                                className={classes.media}
                                                image={item?.variant?.images[0]?.image || "/no-image-available.webp"}
                                                title={item?.variant?.images[0]?.alt || 'default-image'}
                                            />
                                        </div>
                                        <Grid className={classes.content}>
                                            <Typography
                                                variant='subtitle1'
                                            >
                                                {item.variant.title}
                                            </Typography>
                                        </Grid>
                                    </div>
                                    <Grid item xs/>
                                    <Grid className={classes.content}>
                                        <div>
                                            <Rating
                                                // readOnly={false}
                                                id={`simple-controlled-${index}`}
                                                name={`simple-controlled-${index}`}
                                                key={index}
                                                value={formDataPreview[index]?.rating}
                                                onChange={(event, newValue) => handleRating(event, newValue, index, index)}
                                            />
                                        </div>

                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <input
                                            key={index}
                                            accept="image/*"
                                            id={`contained-button-file-popup-${index}`}
                                            multiple
                                            type="file"
                                            hidden
                                            onChange={(e) => handleUploadClick(e, index)}
                                        />
                                        <FormControl
                                            className={classes.textField}
                                            variant="outlined"
                                        >
                                            <Input
                                                id="standard-adornment-text"
                                                multiline
                                                rows={3}
                                                value={formDataPreview[index]?.message}
                                                placeholder='Do not Shy, tell us more '
                                                onChange={(event) => handleTextChange(event, index)}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                        >
                                                            <label htmlFor={`contained-button-file-popup-${index}`}
                                                                   style={{cursor: "pointer"}}>
                                                                <GrGallery/>
                                                            </label>

                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                    {
                                        !!formDataPreview[index]?.isLoading && <LinearLoader/>
                                    }
                                    <Grid item container style={{padding: "13px"}}>
                                        <Grid
                                            item
                                            xs={12}
                                            md={7}
                                            style={{
                                                display: "contents",
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {
                                                formDataPreview[index]?.images.length > 0 &&
                                                formDataPreview[index]?.images.map((image, imgIndex) => {
                                                    return (
                                                        <div key={imgIndex} className={classes.updated_image}
                                                             onClick={() => {
                                                                 removeImageLink(index, imgIndex)
                                                             }}>
                                                            <CardActionArea className={classes.cardArea}>
                                                                <div>
                                                                    <MdDeleteForever
                                                                        className={classes.deleteIcon}
                                                                    />
                                                                </div>

                                                                <CardMedia
                                                                    className={classes.image}
                                                                    image={image.image}
                                                                    title={image.alt}
                                                                />

                                                            </CardActionArea>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Grid>
                                        <Grid item xs/>
                                        <Grid item container xs={12} md={5} style={{display: 'flex'}}>
                                            <Grid item xs={6} className={classes.btnStyle}>
                                                {
                                                    formDataPreview[index]?.isCancelBtnVisible &&
                                                    <Button
                                                        variant="contained"
                                                        color="default"
                                                        onClick={() => onClickCancel(index)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                }

                                            </Grid>
                                            <Grid item xs={6} className={classes.btnStyle}>
                                                <Button
                                                    disabled={!formDataPreview[index]?.isCancelBtnVisible}
                                                    variant="contained"
                                                    color='primary'
                                                    onClick={
                                                        item.variant.review ?
                                                            () => handleUpdate(index, item.variant.review.id)
                                                            :
                                                            () => handleSubmit(index, item.variant.id)
                                                    }
                                                >
                                                    {item.variant.review ? "Update" : "Submit"}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })

                }
            </Grid>
            <MuiAlert
                showAlert={showAlert}
                setOpen={setShowAlert}
            />
        </Grid>
    )
}
export default ProductReviewPopup