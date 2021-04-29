import {Input, Div, FormError, Label} from '../../styledComps';

const FormInput = ({w, mgL, mgR, label, name, error, errorMessage, register, registerObject, labeled, type='text'})=>{
    
    return (
        <Div
            col
            w={w}
            mgL={mgL}
            mgR={mgR}
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