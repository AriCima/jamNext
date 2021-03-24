import {Input, Div, FormError, Label} from '../../styledComps';

const FormInput = ({w, label, error, errorMessage, register, registerObject, labeled, type='text'})=>{
    const name = labeled || label[0].toUpperCase()+label.slice(1);
    
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
                <Label>{name}</Label>
                {error && <FormError bold>{errorMessage}</FormError>}
            </Div>
            <Input
                type={type}
                w={w}
                name={label}
                ref={register(registerObject)}
            />
        </Div>
    )
};

export default FormInput