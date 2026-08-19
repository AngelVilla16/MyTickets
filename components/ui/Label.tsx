interface labelProps{
    text?:string,
    className?:string,
    id?:string,
}

export default function Label({className, text, id}:labelProps){
    return(
        <>
           <label id={id} className={className}>
                {text}
           </label>
        </>
    );
}