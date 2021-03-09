import React from 'react'

const Temperature = ({userTemp}) => {

    if(userTemp){
        return(
            <h2>{userTemp}&#8451;</h2>
        )
    }else{
        return (
            <h2>
              Loading....  
            </h2>
        )
    }
    
}

export default Temperature
