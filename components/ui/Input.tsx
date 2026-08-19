interface inputProps{
    className?:string
    type?:string,
    placeholder?:string,
    onChange?:(e:React.ChangeEvent<HTMLInputElement>) =>void,
    id?:string,
    checked?:boolean,
    value?:string
}

export default function Input({ className, type, placeholder, onChange, id, checked, value}:inputProps){
    return(
        <>
            <input className={className} type={type} placeholder={placeholder} onChange={onChange} id={id}
            checked={checked} value={value} />
            
            
        </>
    );
}