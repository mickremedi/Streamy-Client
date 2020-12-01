import React from "react";
import {
    Field,
    InjectedFormProps,
    reduxForm,
    WrappedFieldMetaProps,
    WrappedFieldProps,
    reset,
} from "redux-form";
import { connect, ConnectedProps } from "react-redux";
import { createStream } from "../../actions";

const connector = connect(null, { createStream });

type PropsFromReduxAndForm = ConnectedProps<typeof connector> &
    InjectedFormProps<StreamForm>;

const renderError = ({ error, touched }: WrappedFieldMetaProps) => {
    if (touched && error) {
        return (
            <div className="ui error message">
                <div className="header">{error}</div>
            </div>
        );
    }
    return null;
};

const renderInput = ({
    input,
    label,
    meta,
}: WrappedFieldProps & { label: string }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
        <div className={className}>
            <label>{label}</label>
            <input type="text" {...input} autoComplete="off" />
            {renderError(meta)}
        </div>
    );
};

const StreamCreate = (props: PropsFromReduxAndForm) => {
    const onSubmit = (formValues: any) => {
        props.createStream(formValues);
        props.reset();
    };

    return (
        <div>
            <form
                name="submitStream"
                onSubmit={props.handleSubmit(onSubmit)}
                className="ui form error"
            >
                <Field
                    name="title"
                    component={renderInput}
                    label="Enter Title"
                />
                <Field
                    name="description"
                    component={renderInput}
                    label="Enter Description"
                />
                <button type="submit" className="ui button primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

const validate = (formValues: StreamForm) => {
    const errors: { [k: string]: string } = {};
    if (!formValues.title) {
        errors.title = "You must enter a title";
    }

    if (!formValues.description) {
        errors.description = "You must enter a description";
    }

    return errors;
};

const formWrapped = reduxForm<StreamForm, any>({
    form: "streamCreate",
    validate: validate,
})(StreamCreate);

export default connector(formWrapped);
