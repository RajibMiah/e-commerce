import moment from 'moment'

export const  _milliToDate = (milli) => {
    return moment(parseInt(milli)).format('dddd, MMMM Do YYYY')
}
export const  _milliToTimePmAndDate = (milli) => {
    return moment(milli).format('MMM D ,YYYY')
}

export const  _milliToDateOnly = (milli) => {
    return moment(parseInt(milli)).format('dd.MM.YYYY')
}
export const  _milliToDateRow = (milli) => {
    return moment(parseInt(milli)).format('DD.MM.YYYY')
}

export const _timeAgoFromMillis =(milli)=> {
    return moment(parseInt(milli)).fromNow()
}