import React, {useEffect, useMemo, useState} from 'react';
import {
    ProgressBarWrapper,
    ProgressStep,
    ProgressBar,
    StatusTitle,
    StatusBox,
    StatusDetails,
    CheckMarkWrapper,
} from './progress-box.style';
import {CheckMark} from 'assets/icons/CheckMark';
import {CloseIcon} from "../../assets/icons/CloseIcon";

type ProgressProps = {
    data?: any;
    status?: any;
};

const ProgressBox: React.FC<ProgressProps> = ({status, data}) => {
        const [cancelStatus, setCancelStatus] = useState<number>(5)
        useMemo(() => {
            data.pop()
            if (status === 7) {
                data.push('Returned')
            } else if (status === 5) {
                data.push('Canceled')
            } else {
                data.push('Delivered')
            }
        }, [status])
        return (
            <>
                {data.map((item, index) => {
                    return (<ProgressStep key={index}>
                            <ProgressBarWrapper
                                className={status !== cancelStatus ? (status >= index) ? 'checked' : '' : 'cancel'}>
                                <StatusBox>
                                    {
                                        status !== cancelStatus ?
                                            (status >= index) ? (
                                                <CheckMarkWrapper>
                                                    <CheckMark/>
                                                </CheckMarkWrapper>
                                            ) : (
                                                <>
                                                    <CheckMarkWrapper>
                                                        {/*<CloseIcon/>*/}
                                                    </CheckMarkWrapper>
                                                </>
                                            )
                                            : <>
                                                <CheckMarkWrapper>
                                                    <CloseIcon/>
                                                </CheckMarkWrapper>
                                            </>

                                    }
                                </StatusBox>
                                <ProgressBar/>
                            </ProgressBarWrapper>
                            <StatusDetails>
                                {item ? <StatusTitle>{item}</StatusTitle> : ''}
                            </StatusDetails>
                        </ProgressStep>
                    )
                })
                }
            </>
        );
    }
;

export default ProgressBox;
