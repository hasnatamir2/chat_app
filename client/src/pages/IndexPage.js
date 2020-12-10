import React from 'react'

export default function IndexPage({history}) {

    React.useEffect( () => {
        const token = localStorage.getItem('DC_TOKEN')
        if(!token){
            history.push('/login')
        }else{
            history.push('/dashboard')
        }
    })
    return (
        <div>
            index
        </div>
    )
}
