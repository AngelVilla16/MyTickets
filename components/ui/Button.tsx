interface buttonProps{
    className?:string,
    textBtn?:string,
    onClick?:()=>void,
    type?: "button" | "submit" | "reset"
}

export default function Button({className, textBtn, onClick, type}: buttonProps){
    return(
        <>
            <button className={className} type={type} onClick={onClick}>
                {textBtn}
            </button>
        </>
    );
}