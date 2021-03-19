import styled from 'styled-components';

// FORMATO

{/*
    <Div
        w='400px'
        h='400px'
        back='red'
        orient='column'
        just='flex-start'
        align='cemter'
    > 
*/}
  
const Div = styled.div(props => ({
    background: props.back ? props.back : 'transparent',
    height: props.h,
    width: props.w,
    display: 'flex',
    flexDirection: props.orient,
    justifyContent: props.just ? props.just : 'center',
    alignItems: props.align ? props.align : 'center'
}))

export default Div;