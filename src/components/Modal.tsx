import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal as UIModal } from "semantic-ui-react";

type ComponentProps = {
    title: string;
    content: string;
    actions: JSX.Element;
    onDismiss: () => void;
};

const Modal = (props: ComponentProps) => {
    return (
        <UIModal defaultOpen size="tiny" onClose={props.onDismiss}>
            <UIModal.Header>{props.title}</UIModal.Header>
            <UIModal.Content>{props.content}</UIModal.Content>
            <UIModal.Actions>{props.actions}</UIModal.Actions>
        </UIModal>
    );
};

export default Modal;
