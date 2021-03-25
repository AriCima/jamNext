import {Input, Div, FormError, Label} from '../../styledComps';

const FormInput = ({w, label, name, error, errorMessage, register, registerObject, labeled, type='text'})=>{
    
    return (
        <Div
            w={w}
            orient="column"
            just="center"
            align="flex-start"
        >
            <Div
                w="100%"
                orient="column"
                just="center"
                align="flex-start"
            >
                <Label>{label}</Label>
                {error && <FormError bold>{errorMessage}</FormError>}
            </Div>
            <Input
                type={type}
                w={w}
                name={name}
                ref={register(registerObject)}
            />
        </Div>
    )
};

export default FormInput