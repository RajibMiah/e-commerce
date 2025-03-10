import React from "react";
import Collapse, { Panel } from "rc-collapse";
import AccordionWrapper from "./accordion.style";
import { FormattedMessage } from "react-intl";

type AccordionProps = {
    router?: any;
    className?: string;
    items: any[];
    id?: number;
    handleCategorySelection?: any;
};

function expandIcon({ isActive }) {
    return (
        <i>
            {isActive ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="1.494"
                    viewBox="0 0 12 1.494"
                >
                    <path
                        data-name="_ionicons_svg_ios-remove (4)"
                        d="M138.753,240H128.247a.747.747,0,0,0,0,1.494h10.506a.747.747,0,1,0,0-1.494Z"
                        transform="translate(-127.5 -240)"
                        fill="currentColor"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                >
                    <path
                        data-name="_ionicons_svg_ios-add (7)"
                        d="M138.753,132.753h-4.506v-4.506a.747.747,0,1,0-1.494,0v4.506h-4.506a.747.747,0,0,0,0,1.494h4.506v4.506a.747.747,0,1,0,1.494,0v-4.506h4.506a.747.747,0,1,0,0-1.494Z"
                        transform="translate(-127.5 -127.5)"
                        fill="currentColor"
                    />
                </svg>
            )}
        </i>
    );
}

const Accordion: React.FC<AccordionProps> = ({ className, items = [] }) => (
    <AccordionWrapper>
        <Collapse
            accordion={true}
            className={`accordion ${className}`.trim()}
            defaultActiveKey="active"
            expandIcon={expandIcon}
        >
            {items.length !== 0 &&
            items.map((item) => {
                return (
                    <Panel
                        header={
                            <h3>
                                <FormattedMessage
                                    id={item.intlTitleId}
                                    defaultMessage="Please add title in language file"
                                />
                            </h3>
                        }
                        headerClass="accordion-title"
                        key={item.id}
                    >
                        <p key={item.id}>
                            <FormattedMessage
                                id={item.intlDetailsId}
                                defaultMessage="Please add description in language file"
                                values={item.values ? item.values : ""}
                            />
                        </p>
                    </Panel>
                );
            })}
        </Collapse>
    </AccordionWrapper>
);

export default Accordion;
