import React from "react";
import {
    Field,
    InjectedFormProps,
    reduxForm,
    WrappedFieldMetaProps,
    WrappedFieldProps,
} from "redux-form";
import { RouteComponentProps } from "react-router-dom";

type PropsFromReduxAndForm = InjectedFormProps<StreamForm> &
    RouteComponentProps & {
        onSubmit: (formValues: StreamForm) => void;
        initialValues: Stream;
    };

const StreamForm = ({ handleSubmit, onSubmit, initialValues }: PropsFromReduxAndForm) => {
    return (
        <div>
            <form name="submitStream" onSubmit={handleSubmit(onSubmit)} className="ui form error">
                <Field
                    name="title"
                    component={renderInput}
                    label="Enter Title"
                    value={initialValues ? initialValues.title : ""}
                />
                <Field
                    name="description"
                    component={renderInput}
                    label="Enter Description"
                    value={initialValues ? initialValues.description : ""}
                />
                <button type="submit" className="ui button primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

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

const renderInput = ({ input, label, meta }: WrappedFieldProps & { label: string }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
        <div className={className}>
            <label>{label}</label>
            <input type="text" {...input} autoComplete="off" />
            {renderError(meta)}
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

export default reduxForm<StreamForm, any>({
    form: "streamForm",
    validate: validate,
})(StreamForm);
