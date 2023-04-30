
export const EmailState = {
    SECURITY: {id: "SECURITY", text: "Электронная почта добавлена", icon: require("../../../resources/icons/security_security.png")},
    EMAIL_VERIFICATION: {id: "EMAIL_VERIFICATION", text: "Подтвердите свой адрес электронной почты", icon: require("../../../resources/icons/email_blocker.png")},
    INSECURITY: {id: "INSECURITY", text: "Электронная почта не добавлена", icon: require("../../../resources/icons/insecurity_security.png")}
}

export function getEmailState(email, emailVerification) {
    if(email == null){
        return EmailState.INSECURITY
    } else if (!emailVerification){
        return EmailState.EMAIL_VERIFICATION
    }else {
        return EmailState.SECURITY
    }
}