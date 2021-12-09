import React, { useState} from 'react'
import {
    Avatar,
    Grid,
    Typography
} from '@material-ui/core'
import {openModal} from "@redq/reuse-modal";
import {makeStyles} from '@material-ui/styles'
import {Rating} from "@material-ui/lab";
import ReadMore from "../../truncate/truncate";
import UserReviews from 'components/cart-popup/user-reviews-pop'
import {useReview} from "data/use-review";
import {_milliToTimePmAndDate} from "utils/date-converter-utlis";
import styled from "styled-components";

interface Theme {
    breakpoints: any
}

const useStyle = makeStyles((theme: Theme) => ({
    root: {},
    headerContainer: {
        display: "flex",
        alignItems: 'center'
    },
    header: {
        marginLeft: "8px"
    },
    seeMoreContainer: {
        textAlign: 'end',
        fontSize: '30px',
    },
    imageContainer: {
        cursor: 'pointer',
        [theme.breakpoints.up('xs')]: {
            margin: "0px",
        },
    },
    popupImageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: 'pointer',
        [theme.breakpoints.up('xs')]: {
            margin: "0px",
        },
    },
    image: {
        position: 'relative',
        width: '2.5rem',
        margin: "0.5rem",
    },
    seeMoreIcon: {
        border: "1px solid",
        cursor: 'pointer'
    },
    userContainer: {
        margin: '13px',
        marginLeft: "0px"
    },
    comments: {
        marginTop: '0.2rem',
        // marginLeft: "4.5rem",
        opacity: "0.8",
    },
    imagePreContainer: {
        height: "auto",
        width: "auto",
        display: "grid",
        justifyContent: 'center',
    },
    user_info_container: {
        [theme.breakpoints.up('xs')]: {
            paddingLeft: "1.1rem",
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: "1.5rem"
        },
        [theme.breakpoints.up('xl')]: {
            paddingLeft: "0"
        },
    }
}))
type Result = {
    user: {
        avatar: string,
        first_name: string,
        last_name: string,
    },
    images: any,
    message: string,
    rating: any,
    created_date: any
}

const UserInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const ImagePreview = ({image}) => {
    const classes = useStyle()
    return (
        <div className={classes.popupImageContainer}>
            <img
                style = {{width:'65%' , height:"55vh", objectFit: "contain"}}
                src={image.image}
                alt={image.alt}
            />
        </div>
    )
}

const UserReview = ({id, setRatingCount}: any) => {
    const classes = useStyle()
    const [limit, setLimit] = useState(3)
    const {loading, reviews} = useReview({variantId: id})
    const openMoreReviews = (reviews) => {
        openModal({
            show: true,
            overlayClassName: "quick-view-overlay",
            closeOnClickOutside: true,
            component: UserReviews,
            closeComponent: "",
            componentProps: {variantId: id},
            config: {
                enableResizing: false,
                disableDragging: true,
                className: "quick-view-modal",
                width: 800,
                height: "auto",
            },
        });
    };

    const openImagePreview = (image) => {
        openModal({
            show: true,
            overlayClassName: "quick-view-overlay",
            closeOnClickOutside: true,
            component: ImagePreview,
            closeComponent: "",
            componentProps: {image},
            config: {
                enableResizing: false,
                disableDragging: true,
                className: "quick-view-modal",
                width: 800,
                height: "auto",
            },
        });
    };

    if (loading) return null
    if (reviews.results.length) {
        setRatingCount(reviews.count)
        return (
            <>
                <Grid container>
                    <Grid item xs={6} className={classes.headerContainer}>
                        <Typography>
                            Reviews
                        </Typography>
                        <Typography className={classes.header}>
                            ({reviews?.count})
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.seeMoreContainer}>
                        <Typography
                            variant='body1'
                            color='primary'
                            style={{
                                cursor: 'pointer'
                            }}
                            onClick={() => openMoreReviews(reviews)}
                        >
                            See All
                        </Typography>
                    </Grid>
                </Grid>
                {
                    reviews?.results.map((result: Result, index) => {
                        if (index < limit && result.user) {
                            return (
                                <Grid key={index} item xs={12} container className={classes.userContainer}>
                                    <Grid item xs={2} lg={1} xl={1}>
                                        <Avatar
                                            style={{width: "80%", height: "auto"}}
                                            src={result?.user?.avatar}
                                            alt='user avatar'
                                        />
                                    </Grid>
                                    <Grid item xs={10} container className={classes.user_info_container}>
                                        <UserInfoContainer>
                                            <div>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        variant="subtitle2"
                                                    >
                                                        {result?.user.first_name + " " + result?.user.last_name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Rating
                                                        name="read-only"
                                                        value={parseInt(result?.rating)}
                                                        readOnly
                                                        style={{
                                                            fontSize: '16px'
                                                        }}
                                                    />
                                                </Grid>
                                            </div>
                                            <div>
                                                <Typography variant="subtitle2">
                                                    {
                                                        _milliToTimePmAndDate(result?.created_date)
                                                    }
                                                </Typography>
                                            </div>
                                        </UserInfoContainer>

                                        <Grid item xs={12} className={classes.comments}>
                                            <ReadMore character={600}>
                                                {result?.message}
                                            </ReadMore>
                                        </Grid>
                                        {
                                            result.images &&
                                            <Grid item xs={12} container className={classes.imageContainer}>
                                                {
                                                    result.images.map((image, index) => {
                                                        return (
                                                            <img
                                                                key={index}
                                                                onClick={() => openImagePreview(image)}
                                                                className={classes.image}
                                                                src={image.thumbnail}
                                                                alt={image.alt}
                                                            />
                                                        )
                                                    })}
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                            )
                        }
                    })
                }
            </>
        )
    } else {
        return null
    }

}

export default UserReview
