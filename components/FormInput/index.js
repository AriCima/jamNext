import {Input, Div, FormError, Label} from '../../styledComps';

const FormInput = ({w, label, name, error, errorMessage, register, registerObject, labeled, type='text'})=>{
    
    return (
        <Div
            col
            w={w}
            just="center"
            align="center"
        >
            <Div
                col
                w="100%"
                just="center"
                align="flex-start"
            >
                <Label>{label}</Label>
                {error && <FormError bold>{errorMessage}</FormError>}
            </Div>
            <Input
                w="100%"
                type={type}
                name={name}
                ref={register(registerObject)}
            />
        </Div>
    )
};

export default FormInput