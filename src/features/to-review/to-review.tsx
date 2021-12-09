import React, {useState} from 'react'
import {Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {usePurchaseVariant} from "data/use-review";
import ReviewContent from 'features/to-review/review-content'
import {QueryParams} from "../../data/use-variant";
import {useRouter} from "next/router";

const useStyles = makeStyles(theme => ({
    paper: {
        //minHeight: '40vh'
    },
}))

const ToReview = () => {
    const classes = useStyles()
    const router = useRouter()
    const {query} = router
    const {loading, variants, error, mutate} = usePurchaseVariant({is_reviewed: query.is_reviewed})
    if (loading) return <h4>Loading...</h4>
    if (error) return <h4>Something went wrong</h4>
    return (
        <Grid container>
            <Grid item container>
                <ReviewContent data={variants} mutate = {mutate}/>
            </Grid>
        </Grid>
    )
}
export default ToReview