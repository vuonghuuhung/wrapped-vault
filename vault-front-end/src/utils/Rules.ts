import * as yup from 'yup';

export const schema = yup.object({
    deposit: yup
        .string()
        .required('Amount is required')
        .test({
            name: 'value-not-allow',
            message: 'Amount must greater than 0',
            test: function (value) {
                if (Number(value) >= 1) {
                    return true;
                } else {
                    return false;
                }
            },
        }),

    withdraw: yup
        .string()
        .required('Amount is required')
        .test({
            name: 'value-not-allow',
            message: 'Amount must be greater than 0',
            test: function (value) {
                if (Number(value) > 0) {
                    return true;
                }
                return false;
            },
        }),
});

export type Schema = yup.InferType<typeof schema>;
