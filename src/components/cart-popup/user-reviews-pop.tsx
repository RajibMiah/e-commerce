import React, {useState} from 'react'
import {
    Avatar, Box,
    Grid, Paper,
    Typography
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {Rating} from "@material-ui/lab";
import ReadMore from "../truncate/truncate";
import {_milliToTimePmAndDate} from "utils/date-converter-utlis";
import {useReviewInfinityScroll} from "data/use-review";
import useAutoScroll from "contexts/hooks/useAutoScroll";
import {openModal} from "@redq/reuse-modal";
import styled from "styled-components";

interface Theme {
    breakpoints: any
}

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        margin: '1rem'
    },
    headerContainer: {
        display: "flex"
    },
    header: {
        marginLeft: "8px"
    },
    imageContainer: {
        cursor: 'pointer',
    },
    image: {
        width: '2.5rem',
        margin: "0.5rem",
    },
    seeMoreContainer: {
        textAlign: 'end',
        fontSize: '30px',
    },
    seeMoreIcon: {
        border: "1px solid",
        cursor: 'pointer'
    },
    userContainer: {
        margin: '10px',
        marginLeft: "0px"
    },
    comments: {
        opacity: "0.8"
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

const UserInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

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

const ImagePreview = ({image}) => {
    const classes = useStyle()
    return (
        <div
            className={classes.imageContainer}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <img
                src={image.image}
                alt={image.alt}
                style={{width: '65%', height: "55vh", objectFit: "contain"}}
            />
        </div>
    )
}

const UserReviews = ({id, variantId}: any) => {
    const classes = useStyle()
    const [pageSize, setPageSize] = useState<number>(10)
    const {isLoading, isReachingEnd, isRefreshing, reviews, error, fetchMore} = useReviewInfinityScroll({
        variantId,
        page_size: pageSize
    })
    const {observerRef} = useAutoScroll({isLoading, isReachingEnd, fetchMore})

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

    return (
        <>
            {
                reviews.map((result: Result, index) => {
                    if (result.user) {
                        if (reviews.length === index + 1) {
                            return (
                                <Paper className={classes.root} key={index} ref={observerRef}>
                                    <Box style={{padding: "17px"}}>
                                        <Grid item xs={12} container className={classes.userContainer}>
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
                                    </Box>
                                </Paper>
                            )
                        } else {
                            return (
                                <Paper className={classes.root} key={index}>
                                    <Box style={{padding: "17px"}}>
                                        <Grid item xs={12} container className={classes.userContainer}>
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
                                    </Box>
                                </Paper>
                            )
                        }
                    }
                })
            }
        </>
    )
}

export default UserReviews
