import { useSelector } from 'react-redux'
import { texts } from '../config/texts'
import { FormWrapper } from './FormWrapper.jsx'
import { FormButton } from './FormButton.jsx'

export function RegistrSuccessMessage(props) {
    const lang = useSelector(state => state.lang.value)

    return (
        <FormWrapper >
            <span></span>
            <p className="mb-5">{texts[lang].signUpSuccess.text1} <br />{texts[lang].signUpSuccess.text2}</p>
            <FormButton >{texts[lang].signUpSuccess.homeButton}</FormButton>
        </FormWrapper>
    )
}