import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useRouter} from "next/router";
import {FaFilter} from 'react-icons/fa';
import {FilterContainer, FilterIcon, FilterRootContainer, FilterText, PopoverContainer} from "./my-review-filter.style";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function SimplePopover() {
    const classes = useStyles();
    const router = useRouter()
    const {pathname, query} = router
    const {type, ...rest} = query;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClick = (text_boolean) => {
        router.push(
            {
                pathname,
                query: {...rest, is_reviewed: text_boolean},
            },
            {
                pathname,
                query: {...rest, is_reviewed: text_boolean},
            }
        ).then(r => handleClose());
    }

    const getTextTitle = (text) => {
        switch (text) {
            case "default":
                return 'default'
            case "true":
                return 'Old reviews'
            case "false":
                return 'New reviews'
            default:
                return "default"
        }
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <FilterRootContainer>
            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleOpenPopover}>
                <FaFilter style={{marginRight: '7px'}}/>
                <span> {query.is_reviewed && getTextTitle(query.is_reviewed.toString()) || 'Default'}</span>
            </Button>
            <PopoverContainer
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <FilterContainer onClick={() => handleClick('default')}>
                    <FilterIcon/>
                    <FilterText>Default</FilterText>
                </FilterContainer>
                <FilterContainer onClick={() => handleClick('false')}>
                    <FilterIcon/>
                    <FilterText>New reviews</FilterText>
                </FilterContainer>
                <FilterContainer onClick={() => handleClick('true')}>
                    <FilterIcon/>
                    <FilterText>Old reviews</FilterText>
                </FilterContainer>
            </PopoverContainer>
        </FilterRootContainer>
    );
}