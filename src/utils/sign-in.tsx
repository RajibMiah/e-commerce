import AuthenticationForm from "features/authentication-form";
import { openModal } from "@redq/reuse-modal";
export const handleJoin = () => {
    openModal({
        show: true,
        overlayClassName: "quick-view-overlay",
        closeOnClickOutside: true,
        component: AuthenticationForm,
        closeComponent: "",
        config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
            animationFrom: { opacity: "0" }, // react-spring <Spring from={}> props value
            animationTo: { opacity: "1" }, //  react-spring <Spring to={}> props value
            transition: {
                delay: 500,
            },
            withRnd: false,
        },
    });
};
