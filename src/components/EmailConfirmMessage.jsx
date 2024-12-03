import { useSelector } from 'react-redux'
import { texts } from '../config/texts'
import { FormWrapper } from './FormWrapper.jsx'
import { FormButton } from './FormButton.jsx'

export function EmailConfirmMessage({email}) {
    const lang = useSelector(state => state.lang.value)

    return (
        <FormWrapper >
            <p className="mb-5">{texts[lang].signUpConfirm.text1} <span style={{ fontWeight: '600' }}>{email}</span> <br />{texts[lang].signUpConfirm.text2}</p>
            <FormButton >{texts[lang].signUpConfirm.homeButton}</FormButton>
        </FormWrapper>
    )
}