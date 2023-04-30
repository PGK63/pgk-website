
export const TelegramState = {
    SECURITY: {id: "SECURITY", text: "Telegram-бот добавлен", icon: require("../../../resources/icons/security_security.png")},
    INSECURITY: {id: "INSECURITY", text: "Telegram-бот не добавлен", icon: require("../../../resources/icons/insecurity_security.png")}
}

export function getTelegramState(
    telegramId
) {
    if(telegramId == null){
        return TelegramState.INSECURITY
    }else{
        return TelegramState.SECURITY
    }
}