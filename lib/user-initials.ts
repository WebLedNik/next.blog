export const getInitials = (name: string) => {
    if(!name){
        return
    }

    return name.split(' ')[0].charAt(0).toUpperCase()
}
